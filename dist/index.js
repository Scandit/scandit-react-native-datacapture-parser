import { nameForSerialization, DefaultSerializeable, ignoreFromSerialization } from 'scandit-react-native-datacapture-core/dist/core';
import { NativeModules } from 'react-native';

class ParserIssue {
    _code;
    get code() {
        return this._code;
    }
    _message;
    get message() {
        return this._message;
    }
    _additionalInfo;
    get additionalInfo() {
        return this._additionalInfo;
    }
    static fromJSON(json) {
        const issue = new ParserIssue();
        issue._code = json.code;
        issue._message = json.message;
        issue._additionalInfo = json.additionalInfo;
        return issue;
    }
}

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
    _warnings;
    get warnings() {
        return this._warnings;
    }
    static fromJSON(json) {
        const field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._issues = json.issues || [];
        field._warnings = json.warnings?.map(e => ParserIssue.fromJSON(e)) || [];
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
    _fieldsWithIssues;
    get fieldsWithIssues() {
        return this._fieldsWithIssues;
    }
    static fromJSON(json) {
        const data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField.fromJSON);
        data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        data._fieldsWithIssues = data._fields.filter(e => e.warnings.length > 0);
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
    createUpdateNativeInstance() {
        return NativeModule.createUpdateNativeInstance(JSON.stringify(this.parser.toJSON()));
    }
    disposeParser() {
        return NativeModule.disposeParser(this.parser.id);
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
        const promise = parser.proxy.createUpdateNativeInstance().then(() => Promise.resolve(parser));
        return promise;
    }
    constructor() {
        super();
        this.proxy = ParserProxy.forParser(this);
    }
    setOptions(options) {
        this.options = options;
        return this.proxy.createUpdateNativeInstance();
    }
    parseString(data) {
        return this.proxy.parseString(data);
    }
    parseRawData(data) {
        return this.proxy.parseRawData(data);
    }
    dispose() {
        this.proxy.disposeParser();
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
    ParserDataFormat["IataBcbp"] = "iataBcbp";
    ParserDataFormat["Gs1DigitalLink"] = "gs1DigitalLink";
})(ParserDataFormat || (ParserDataFormat = {}));

var ParserIssueAdditionalInfoKey;
(function (ParserIssueAdditionalInfoKey) {
    ParserIssueAdditionalInfoKey["StartingCharacters"] = "startingCharacters";
    ParserIssueAdditionalInfoKey["Version"] = "version";
    ParserIssueAdditionalInfoKey["MinimalVersion"] = "minimalVersion";
    ParserIssueAdditionalInfoKey["ElementName"] = "elementName";
    ParserIssueAdditionalInfoKey["String"] = "string";
    ParserIssueAdditionalInfoKey["Length"] = "length";
    ParserIssueAdditionalInfoKey["Charset"] = "charset";
})(ParserIssueAdditionalInfoKey || (ParserIssueAdditionalInfoKey = {}));

var ParserIssueCode;
(function (ParserIssueCode) {
    ParserIssueCode["None"] = "none";
    ParserIssueCode["Unspecified"] = "unspecified";
    ParserIssueCode["MandatoryEpdMissing"] = "mandatoryEpdMissing";
    ParserIssueCode["InvalidDate"] = "invalidDate";
    ParserIssueCode["StringTooShort"] = "stringTooShort";
    ParserIssueCode["WrongStartingCharacters"] = "wrongStartingCharacters";
    ParserIssueCode["InvalidSeparationBetweenElements"] = "invalidSeparationBetweenElements";
    ParserIssueCode["UnsupportedVersion"] = "unsupportedVersion";
    ParserIssueCode["IncompleteCode"] = "incompleteCode";
    ParserIssueCode["EmptyElementContent"] = "emptyElementContent";
    ParserIssueCode["InvalidElementLength"] = "invalidElementLength";
    ParserIssueCode["TooLongElement"] = "tooLongElement";
    ParserIssueCode["NonEmptyElementContent"] = "nonEmptyElementContent";
    ParserIssueCode["InvalidCharsetInElement"] = "invalidCharsetInElement";
    ParserIssueCode["TooManyAltPmtFields"] = "tooManyAltPmtFields";
    ParserIssueCode["CannotContainSpaces"] = "cannotContainSpaces";
})(ParserIssueCode || (ParserIssueCode = {}));

export { ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode };
