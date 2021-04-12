import {DataString} from "./dataString";
import {DataObj} from "./dataObj";
import {ChartElement} from "./chartElement";
import {ipcRenderer} from "electron";
import {Storage} from "./storage";
import {PageController} from "./pageController";

export class Main {
    private dataStr: DataString;
    private charts: ChartElement[] = [];
    private storage: Storage;
    private pageContoller: PageController;

    public static main() {
        new Main();
    }

    public constructor() {
        this.dataStr = new DataString();
        this.storage = new Storage("0!0!0!0!0!0&");
        this.pageContoller = new PageController(20);

        let dataObj: DataObj = this.dataStr.build("0!0!0!0!0!0&");
        console.log(dataObj.getObj());
        this.charts.push(new ChartElement(document.getElementById("tempStat"), "Temperatur", 3, {
            background: "rgba(1,250,0,0.25)",
            border: "rgb(61,175,33)"
        }));
        this.charts.push(new ChartElement(document.getElementById("pressureStat"), "Luftdruck", 4, {
            background: "rgba(0,255,241, 0.25)",
            border: "rgb(0,154,179)"
        }));
        this.charts.push(new ChartElement(document.getElementById("highStat"), "Flug Höhe", 5 , {
            background: "rgba(255,0,0,0.25)",
            border: "rgb(206,14,14)"
        }));
        this.updateAllCharts(dataObj);

        window.addEventListener("scroll", function () {
            if (this.scrollY > 0) {
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.position = "fixed";
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.width = "100%";
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.backgroundColor = "#e0e0e0";


                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.position = "fixed";
                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.width = "100%";
                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.top = "50px";
            } else {
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.position = "";
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.with = "";
                // @ts-ignore
                document.getElementsByClassName("header")[0].style.backgroundColor = "";

                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.position = "";
                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.width = "";
                // @ts-ignore
                document.getElementsByClassName("secondHeader")[0].style.top = "";
            }
        });

        document.getElementById('buttonDataLog')?.addEventListener("click", async () => {
            const resStr = await ipcRenderer.invoke('getDataObj', "");
            if (resStr === false) {
                ipcRenderer.send("formatError", "");
                return;
            } else {
                let dataObj: DataObj = this.dataStr.build(resStr);
                this.storage = new Storage(resStr);
                this.updateAllCharts(dataObj);
            }
        });

        document.getElementById("storageBack")?.addEventListener("click", () => {
            this.storage.backStorage();
            this.storage.getStorageByIndex((storageItem) => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("storageCount").value = this.storage.getIndex().toString();
        });

        document.getElementById("storageCount")?.addEventListener("change", () => {
            // @ts-ignore
            this.storage.setIndex(parseInt(document.getElementById("storageCount").value));
            this.storage.getStorageByIndex((storageItem) => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("storageCount").value = this.storage.getIndex().toString();
        });

        document.getElementById("storageNext")?.addEventListener("click", () => {
            this.storage.nextStorage();
            this.storage.getStorageByIndex(storageItem => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("storageCount").value = this.storage.getIndex().toString();
        });

        document.getElementById("clearStorage")?.addEventListener("click", () => {
            this.storage.deleteStorageByIndex((storageItem) => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("storageCount").value = this.storage.getIndex().toString();
        });

        document.getElementById("pageBack")?.addEventListener("click", () => {
            this.pageContoller.pageBack();
            this.storage.getStorageByIndex((storageItem) => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("pageCount").value = (this.pageContoller.getPageIndex() + 1).toString();
        });

        document.getElementById("pageNext")?.addEventListener("click", () => {
            this.pageContoller.pageNext();
            this.storage.getStorageByIndex((storageItem) => {
                let dataObj: DataObj = this.dataStr.build(storageItem);
                this.updateAllCharts(dataObj);
            });

            // @ts-ignore
            document.getElementById("pageCount").value = (this.pageContoller.getPageIndex() + 1).toString();
        });
    }

    private updateAllCharts(dataObj: DataObj) {
        this.charts.forEach((value) => {
            value.build(dataObj, this.pageContoller);
        });
    }
}
