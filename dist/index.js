import { nameForSerialization, DefaultSerializeable, ignoreFromSerialization } from 'scandit-react-native-datacapture-core/dist/core';
import { NativeModules } from 'react-native';

class ParsedField {
    _name;
    get name() {
        return this._name;
    }
    _parsed;
    get parsed() {
        return this._parsed;
    }
    _rawString;
    get rawString() {
        return this._rawString;
    }
    _issues;
    get issues() {
        return this._issues;
    }
    static fromJSON(json) {
        const field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._issues = json.issues || [];
        return field;
    }
}

class ParsedData {
    _jsonString;
    get jsonString() {
        return this._jsonString;
    }
    _fields;
    get fields() {
        return this._fields;
    }
    _fieldsByName;
    get fieldsByName() {
        return this._fieldsByName;
    }
    static fromJSON(json) {
        const data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField.fromJSON);
        data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        return data;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// tslint:disable:variable-name
const NativeModule = NativeModules.ScanditDataCaptureParser;
// tslint:enable:variable-name
// We need to force the initialization of the native module,
// so the parser deserializer is correctly registered in ScanditDataCaptureCore
NativeModule.Defaults;
class ParserProxy {
    parser;
    static forParser(parser) {
        const proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    }
    parseString(data) {
        return NativeModule.parseString(this.parser.id, data)
            .then((parsedData) => ParsedData.fromJSON(JSON.parse(parsedData)));
    }
    parseRawData(data) {
        return NativeModule.parseRawData(this.parser.id, data)
            .then((parsedData) => ParsedData.fromJSON(JSON.parse(parsedData)));
    }
}

class Parser extends DefaultSerializeable {
    type = 'parser';
    dataFormat;
    options = {};
    _id = `${Date.now()}`;
    get id() {
        return this._id;
    }
    _context;
    proxy;
    static forContextAndFormat(context, dataFormat) {
        const parser = new Parser();
        parser.dataFormat = dataFormat;
        const promise = context.addComponent(parser).then(() => Promise.resolve(parser));
        return promise;
    }
    constructor() {
        super();
        this.proxy = ParserProxy.forParser(this);
    }
    setOptions(options) {
        this.options = options;
        return this._context.update();
    }
    parseString(data) {
        return this.proxy.parseString(data);
    }
    parseRawData(data) {
        return this.proxy.parseRawData(data);
    }
}
__decorate([
    nameForSerialization('id')
], Parser.prototype, "_id", void 0);
__decorate([
    ignoreFromSerialization
], Parser.prototype, "_context", void 0);
__decorate([
    ignoreFromSerialization
], Parser.prototype, "proxy", void 0);

var ParserDataFormat;
(function (ParserDataFormat) {
    ParserDataFormat["GS1AI"] = "gs1ai";
    ParserDataFormat["HIBC"] = "hibc";
    /**
     * @deprecated ParserDataFormat.DLID
     * Use ID Capture instead.
     */
    ParserDataFormat["DLID"] = "dlid";
    /**
     * @deprecated ParserDataFormat.MRTD
     * Use ID Capture instead.
     */
    ParserDataFormat["MRTD"] = "mrtd";
    ParserDataFormat["SwissQR"] = "swissQr";
    ParserDataFormat["VIN"] = "vin";
    /**
     * @deprecated ParserDataFormat.UsUsid
     * Use ID Capture instead.
     */
    ParserDataFormat["UsUsid"] = "usUsid";
})(ParserDataFormat || (ParserDataFormat = {}));

export { ParsedData, ParsedField, Parser, ParserDataFormat };
