"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataString = void 0;
var dataObj_1 = require("./dataObj");
var DataString = (function () {
    function DataString() {
    }
    DataString.prototype.build = function (dataStr) {
        var obj = [];
        var rows = dataStr.split("&");
        for (var i = 0; i < rows.length - 1; i++) {
            obj.push([]);
            var columns = rows[i].split("!");
            for (var k = 0; k < columns.length; k++) {
                obj[i].push(columns[k]);
            }
        }
        return new dataObj_1.DataObj(obj);
    };
    return DataString;
}());
exports.DataString = DataString;
//# sourceMappingURL=dataString.js.map