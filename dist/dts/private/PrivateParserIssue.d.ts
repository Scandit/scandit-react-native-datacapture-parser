import { ParserIssueCode } from '../ParserIssueCode';
import { ParserIssueAdditionalInfoKey } from '../ParserIssueAdditionalInfoKey';
import { ParserIssue } from '../ParserIssue';
export interface ParserIssueJSON {
    code: ParserIssueCode;
    message: string;
    additionalInfo: Record<ParserIssueAdditionalInfoKey, string>;
}
export interface PrivateParserIssue {
    fromJSON(json: ParserIssueJSON): ParserIssue;
}
