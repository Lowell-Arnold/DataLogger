"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataObj = void 0;
var DataObj = (function () {
    function DataObj(data) {
        this.data = data;
    }
    DataObj.prototype.getObj = function () {
        return this.data;
    };
    DataObj.prototype.getStats = function (index) {
        var stats = [];
        if (index > this.data[0].length - 1 || index < 0) {
            console.error("pos is not in length of object");
            return false;
        }
        for (var i = 0; i < this.data.length; i++) {
            stats.push(this.data[i][index]);
        }
        return stats;
    };
    DataObj.prototype.getLength = function () {
        var nums = [];
        for (var i = 0; i < this.data.length; i++) {
            nums.push((i + 1).toString());
        }
        return nums;
    };
    return DataObj;
}());
exports.DataObj = DataObj;
//# sourceMappingURL=dataObj.js.map