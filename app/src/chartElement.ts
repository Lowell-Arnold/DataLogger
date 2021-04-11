import {DataObj} from "./dataObj";
import {PageController} from "./pageController";

const Chart = require("chart.js");

export class ChartElement {
    private readonly element: HTMLElement;
    private readonly label: string;
    private readonly dataPosition: number;
    private chart: any;
    private firstBuild: boolean;

    public constructor(element: HTMLElement | null, label: string, dataPosition: number) {
        if (element === null) {
            throw "Element is not a HTML element";
        } else {
            this.element = element;
            this.label = label;
            this.dataPosition = dataPosition;
            this.firstBuild = true;
        }
    }

    public build(obj: DataObj, controller: PageController) {
        if (this.firstBuild) {
            this.chart = new Chart(this.element, {
                type: "line",
                data: {
                    labels: controller.transformData(obj.getLength()),
                    datasets: [
                        {
                            label: this.label,
                            backgroundColor: 'rgba(255,0,0,0.4)',
                            borderColor: 'rgba(255,0,0,1)',
                            data: controller.transformData(<string[]>obj.getStats(this.dataPosition))
                        }
                    ]
                }
            });

            this.firstBuild = false;
        } else {
            this.chart.data.labels = controller.transformData(obj.getLength());
            this.chart.data.datasets[0].data = controller.transformData(<string[]>obj.getStats(this.dataPosition));

            this.chart.update();
        }
    }
}
