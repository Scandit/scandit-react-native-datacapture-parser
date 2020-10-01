"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserProxy = void 0;
var react_native_1 = require("react-native");
var ParsedData_1 = require("../ParsedData");
// tslint:disable:variable-name
var NativeModule = react_native_1.NativeModules.ScanditDataCaptureParser;
// tslint:enable:variable-name
// We need to force the initialization of the native module,
// so the parser deserializer is correctly registered in ScanditDataCaptureCore
var _ = NativeModule.Defaults;
var ParserProxy = /** @class */ (function () {
    function ParserProxy() {
    }
    ParserProxy.forParser = function (parser) {
        var proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    };
    ParserProxy.prototype.parseString = function (data) {
        return NativeModule.parseString(this.parser.id, data)
            .then(function (parsedData) { return ParsedData_1.ParsedData.fromJSON(JSON.parse(parsedData)); });
    };
    ParserProxy.prototype.parseRawData = function (data) {
        return NativeModule.parseRawData(this.parser.id, data)
            .then(function (parsedData) { return ParsedData_1.ParsedData.fromJSON(JSON.parse(parsedData)); });
    };
    return ParserProxy;
}());
exports.ParserProxy = ParserProxy;
//# sourceMappingURL=ParserProxy.js.map