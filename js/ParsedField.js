"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedField = void 0;
var ParsedField = /** @class */ (function () {
    function ParsedField() {
    }
    Object.defineProperty(ParsedField.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParsedField.prototype, "parsed", {
        get: function () {
            return this._parsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParsedField.prototype, "rawString", {
        get: function () {
            return this._rawString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParsedField.prototype, "issues", {
        get: function () {
            return this._issues;
        },
        enumerable: false,
        configurable: true
    });
    ParsedField.fromJSON = function (json) {
        var field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._issues = json.issues || [];
        return field;
    };
    return ParsedField;
}());
exports.ParsedField = ParsedField;
//# sourceMappingURL=ParsedField.js.map