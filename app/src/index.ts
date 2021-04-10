import {DataString} from "./dataString";
import {DataObj} from "./dataObj";
import {ChartElement} from "./chartElement";
import {ipcRenderer} from "electron";
import {Storage} from "./storage";

export class Main {
    private dataStr: DataString;
    private charts: ChartElement[] = [];
    private storage: Storage;

    public static main() {
        new Main();
    }

    public constructor() {
        this.dataStr = new DataString();
        let dataObj: DataObj = this.dataStr.build("0!0!0!0!0!0&");
        this.storage = new Storage("0!0!0!0!0!0&");
        this.charts.push(new ChartElement(document.getElementById("tempStat"), "Temperatur", 3));
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
    }

    private updateAllCharts(dataObj: DataObj) {
        this.charts.forEach((value) => {
            value.build(dataObj);
        });
    }
}
