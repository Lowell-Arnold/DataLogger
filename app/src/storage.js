"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var electron_1 = require("electron");
var Storage = (function () {
    function Storage(value) {
        this.sessionStorage = value;
        this.storageIndex = 0;
    }
    Storage.prototype.deleteStorageByIndex = function (callback) {
        var _this = this;
        if (this.storageIndex === 0) {
            this.sessionStorage = "0!0!0!0!0!0&";
            callback(this.sessionStorage);
            return;
        }
        else {
            electron_1.ipcRenderer.invoke("deleteStorage", this.storageIndex - 1).then(function (dataStr) {
                _this.storageIndex--;
                callback(dataStr);
                return;
            });
        }
    };
    Storage.prototype.getStorageByIndex = function (callback) {
        if (this.storageIndex === 0) {
            callback(this.sessionStorage);
            return;
        }
        else {
            electron_1.ipcRenderer.invoke("getStorage", this.storageIndex - 1).then(function (dataStr) {
                console.log(dataStr);
                callback(dataStr);
                return;
            });
            return;
        }
    };
    Storage.prototype.nextStorage = function () {
        if (isNaN(this.storageIndex)) {
            this.storageIndex = 0;
        }
        this.storageIndex++;
    };
    Storage.prototype.backStorage = function () {
        if (isNaN(this.storageIndex)) {
            this.storageIndex = 0;
        }
        if (this.storageIndex === 0) {
            throw new Error("Cannot go back in the storage");
        }
        else {
            this.storageIndex--;
        }
    };
    Storage.prototype.getIndex = function () {
        return this.storageIndex;
    };
    Storage.prototype.setIndex = function (index) {
        this.storageIndex = index;
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map