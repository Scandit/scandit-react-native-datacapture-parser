import { ParserIssueAdditionalInfoKey } from './ParserIssueAdditionalInfoKey';
import { ParserIssueCode } from './ParserIssueCode';
export declare class ParserIssue {
    private _code;
    get code(): ParserIssueCode;
    private _message;
    get message(): string;
    private _additionalInfo;
    get additionalInfo(): Record<ParserIssueAdditionalInfoKey, string>;
    private static fromJSON;
}
