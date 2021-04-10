import {DataObj} from "./dataObj";

const Chart = require("chart.js");

export class ChartElement {
    private readonly element: HTMLElement;
    private readonly label: string;
    private readonly dataPosition: number;
    private chart: any;

    public constructor(element: HTMLElement | null, label: string, dataPosition: number) {
        if (element === null) {
            throw "Element is not a HTML element";
        } else {
            this.element = element;
            this.label = label;
            this.dataPosition = dataPosition;
        }
    }

    public build(obj: DataObj) {
        this.chart = new Chart(this.element, {
            type: "line",
            data: {
                labels: obj.getLength(),
                datasets: [
                    {
                        label: this.label,
                        backgroundColor: 'rgba(255,0,0,0.4)',
                        borderColor: 'rgba(255,0,0,1)',
                        data: obj.getStats(this.dataPosition)
                    }
                ]
            }
        });
    }
}
