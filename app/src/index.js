"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var dataString_1 = require("./dataString");
var chartElement_1 = require("./chartElement");
var electron_1 = require("electron");
var storage_1 = require("./storage");
var pageController_1 = require("./pageController");
var Main = (function () {
    function Main() {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        this.charts = [];
        this.dataStr = new dataString_1.DataString();
        this.storage = new storage_1.Storage("0!0!0!0!0!0&");
        this.pageContoller = new pageController_1.PageController(20);
        var dataObj = this.dataStr.build("0!0!0!0!0!0&");
        console.log(dataObj.getObj());
        this.charts.push(new chartElement_1.ChartElement(document.getElementById("tempStat"), "Temperatur", 3, {
            background: "rgba(1,250,0,0.25)",
            border: "rgb(61,175,33)"
        }));
        this.charts.push(new chartElement_1.ChartElement(document.getElementById("pressureStat"), "Luftdruck", 4, {
            background: "rgba(0,255,241, 0.25)",
            border: "rgb(0,154,179)"
        }));
        this.charts.push(new chartElement_1.ChartElement(document.getElementById("highStat"), "Flug Höhe", 5, {
            background: "rgba(255,0,0,0.25)",
            border: "rgb(206,14,14)"
        }));
        this.updateAllCharts(dataObj);
        window.addEventListener("scroll", function () {
            if (this.scrollY > 0) {
                document.getElementsByClassName("header")[0].style.position = "fixed";
                document.getElementsByClassName("header")[0].style.width = "100%";
                document.getElementsByClassName("header")[0].style.backgroundColor = "#e0e0e0";
                document.getElementsByClassName("secondHeader")[0].style.position = "fixed";
                document.getElementsByClassName("secondHeader")[0].style.width = "100%";
                document.getElementsByClassName("secondHeader")[0].style.top = "50px";
            }
            else {
                document.getElementsByClassName("header")[0].style.position = "";
                document.getElementsByClassName("header")[0].style.with = "";
                document.getElementsByClassName("header")[0].style.backgroundColor = "";
                document.getElementsByClassName("secondHeader")[0].style.position = "";
                document.getElementsByClassName("secondHeader")[0].style.width = "";
                document.getElementsByClassName("secondHeader")[0].style.top = "";
            }
        });
        (_a = document.getElementById('buttonDataLog')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var resStr, dataObj_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, electron_1.ipcRenderer.invoke('getDataObj', "")];
                    case 1:
                        resStr = _a.sent();
                        if (resStr === false) {
                            electron_1.ipcRenderer.send("formatError", "");
                            return [2];
                        }
                        else {
                            dataObj_1 = this.dataStr.build(resStr);
                            this.storage = new storage_1.Storage(resStr);
                            this.updateAllCharts(dataObj_1);
                        }
                        return [2];
                }
            });
        }); });
        (_b = document.getElementById("storageBack")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
            _this.storage.backStorage();
            _this.storage.getStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("storageCount").value = _this.storage.getIndex().toString();
        });
        (_c = document.getElementById("storageCount")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", function () {
            _this.storage.setIndex(parseInt(document.getElementById("storageCount").value));
            _this.storage.getStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("storageCount").value = _this.storage.getIndex().toString();
        });
        (_d = document.getElementById("storageNext")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
            _this.storage.nextStorage();
            _this.storage.getStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("storageCount").value = _this.storage.getIndex().toString();
        });
        (_e = document.getElementById("clearStorage")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
            _this.storage.deleteStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("storageCount").value = _this.storage.getIndex().toString();
        });
        (_f = document.getElementById("pageBack")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
            _this.pageContoller.pageBack();
            _this.storage.getStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("pageCount").value = (_this.pageContoller.getPageIndex() + 1).toString();
        });
        (_g = document.getElementById("pageNext")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
            _this.pageContoller.pageNext();
            _this.storage.getStorageByIndex(function (storageItem) {
                var dataObj = _this.dataStr.build(storageItem);
                _this.updateAllCharts(dataObj);
            });
            document.getElementById("pageCount").value = (_this.pageContoller.getPageIndex() + 1).toString();
        });
    }
    Main.main = function () {
        new Main();
    };
    Main.prototype.updateAllCharts = function (dataObj) {
        var _this = this;
        this.charts.forEach(function (value) {
            value.build(dataObj, _this.pageContoller);
        });
    };
    return Main;
}());
exports.Main = Main;
//# sourceMappingURL=index.js.map