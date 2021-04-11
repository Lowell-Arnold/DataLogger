"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartElement = void 0;
var Chart = require("chart.js");
var ChartElement = (function () {
    function ChartElement(element, label, dataPosition) {
        if (element === null) {
            throw "Element is not a HTML element";
        }
        else {
            this.element = element;
            this.label = label;
            this.dataPosition = dataPosition;
            this.firstBuild = true;
        }
    }
    ChartElement.prototype.build = function (obj, controller) {
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
                            data: controller.transformData(obj.getStats(this.dataPosition))
                        }
                    ]
                }
            });
            this.firstBuild = false;
        }
        else {
            this.chart.data.labels = controller.transformData(obj.getLength());
            this.chart.data.datasets[0].data = controller.transformData(obj.getStats(this.dataPosition));
            this.chart.update();
        }
    };
    return ChartElement;
}());
exports.ChartElement = ChartElement;
//# sourceMappingURL=chartElement.js.map