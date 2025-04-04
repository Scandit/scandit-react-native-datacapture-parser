import { ParserIssue } from './ParserIssue';
export declare class ParsedField {
    private _name;
    get name(): string;
    private _parsed;
    get parsed(): any;
    private _rawString;
    get rawString(): string;
    private _issues;
    get issues(): string[];
    private _warnings;
    get warnings(): ParserIssue[];
    private static fromJSON;
}
