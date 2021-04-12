"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
var PageController = (function () {
    function PageController(pageSize) {
        this.pageSize = pageSize;
        this.pageCount = 0;
        this.lastPage = false;
    }
    PageController.prototype.pageNext = function () {
        if (!this.lastPage) {
            this.pageCount++;
        }
    };
    PageController.prototype.pageBack = function () {
        if (this.pageCount !== 0) {
            this.pageCount--;
        }
    };
    PageController.prototype.transformData = function (data) {
        this.lastPage = false;
        var start = this.pageCount * this.pageSize;
        var newData = [];
        for (var i = start; i < start + this.pageSize; i++) {
            if (data[i] === undefined) {
                this.lastPage = true;
                break;
            }
            newData.push(data[i]);
        }
        return newData;
    };
    PageController.prototype.getPageIndex = function () {
        return this.pageCount;
    };
    return PageController;
}());
exports.PageController = PageController;
//# sourceMappingURL=pageController.js.map