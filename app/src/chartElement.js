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
        }
    }
    ChartElement.prototype.build = function (obj) {
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
    };
    return ChartElement;
}());
exports.ChartElement = ChartElement;
//# sourceMappingURL=chartElement.js.map