"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Serializeable_1 = require("scandit-react-native-datacapture-core/js/private/Serializeable");
var ParserProxy_1 = require("./native/ParserProxy");
var Parser = /** @class */ (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        var _this = _super.call(this) || this;
        _this.type = 'parser';
        _this.options = {};
        _this._id = "".concat(Date.now());
        _this.proxy = ParserProxy_1.ParserProxy.forParser(_this);
        return _this;
    }
    Object.defineProperty(Parser.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Parser.forContextAndFormat = function (context, dataFormat) {
        var parser = new Parser();
        parser.dataFormat = dataFormat;
        var promise = context.addComponent(parser).then(function () { return Promise.resolve(parser); });
        return promise;
    };
    Parser.prototype.setOptions = function (options) {
        this.options = options;
        return this._context.update();
    };
    Parser.prototype.parseString = function (data) {
        return this.proxy.parseString(data);
    };
    Parser.prototype.parseRawData = function (data) {
        return this.proxy.parseRawData(data);
    };
    __decorate([
        (0, Serializeable_1.nameForSerialization)('id')
    ], Parser.prototype, "_id", void 0);
    __decorate([
        Serializeable_1.ignoreFromSerialization
    ], Parser.prototype, "_context", void 0);
    __decorate([
        Serializeable_1.ignoreFromSerialization
    ], Parser.prototype, "proxy", void 0);
    return Parser;
}(Serializeable_1.DefaultSerializeable));
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map