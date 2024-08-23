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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.IconHelper = void 0;
exports.getDataset = getDataset;
var path_1 = require("path");
var dataJson = require("../banks.json");
var promises_1 = require("fs/promises");
var sharp = require("sharp");
function getDataset() {
    return dataJson.th;
}
var IconHelper = /** @class */ (function () {
    function IconHelper() {
    }
    IconHelper.getFilePath = function (icon) {
        return (0, path_1.join)(__dirname, "svg", "".concat(String(icon), ".svg"));
    };
    IconHelper.getRawBuffer = function (icon) {
        if (!this.hasIcon(icon))
            return null;
        return (0, promises_1.readFile)(this.getFilePath(icon));
    };
    IconHelper.hasIcon = function (icon) {
        var keys = Object.keys(getDataset());
        if (!keys.find(function (key) { return key === icon; }))
            return false;
        return true;
    };
    IconHelper.getBuffer = function (icon, options) {
        return __awaiter(this, void 0, void 0, function () {
            var width, height, svgRawBuffer, iconBuffer, canvas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasIcon(icon))
                            return [2 /*return*/, null];
                        width = Number((options === null || options === void 0 ? void 0 : options.width) || 256);
                        height = Number((options === null || options === void 0 ? void 0 : options.height) || 256);
                        return [4 /*yield*/, this.getRawBuffer(icon)];
                    case 1:
                        svgRawBuffer = _a.sent();
                        return [4 /*yield*/, sharp(svgRawBuffer).resize(Number(width / 2)).toBuffer()];
                    case 2:
                        iconBuffer = _a.sent();
                        canvas = sharp({
                            create: {
                                width: width,
                                height: height,
                                channels: 4,
                                background: getDataset()[icon].color
                            }
                        });
                        canvas.composite([{
                                input: iconBuffer,
                                blend: "over",
                            }]);
                        return [2 /*return*/, canvas.toFormat((options === null || options === void 0 ? void 0 : options.format) || "png").toBuffer()];
                }
            });
        });
    };
    return IconHelper;
}());
exports.IconHelper = IconHelper;
//# sourceMappingURL=index.js.map