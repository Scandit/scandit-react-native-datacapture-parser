import { ParsedField } from '../ParsedField';
import { ParserIssueJSON } from './PrivateParserIssue';
export interface ParsedFieldJSON {
    name: string;
    parsed: any;
    rawString: string;
    issues?: string[];
    warnings?: ParserIssueJSON[];
}
export interface PrivateParsedField {
    fromJSON(json: ParsedFieldJSON): ParsedField;
}
