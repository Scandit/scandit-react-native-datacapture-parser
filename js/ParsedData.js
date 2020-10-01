"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedData = void 0;
var ParsedField_1 = require("./ParsedField");
var ParsedData = /** @class */ (function () {
    function ParsedData() {
    }
    Object.defineProperty(ParsedData.prototype, "jsonString", {
        get: function () {
            return this._jsonString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParsedData.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParsedData.prototype, "fieldsByName", {
        get: function () {
            return this._fieldsByName;
        },
        enumerable: false,
        configurable: true
    });
    ParsedData.fromJSON = function (json) {
        var data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField_1.ParsedField.fromJSON);
        data._fieldsByName = data._fields.reduce(function (fieldsByName, field) {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        return data;
    };
    return ParsedData;
}());
exports.ParsedData = ParsedData;
//# sourceMappingURL=ParsedData.js.map