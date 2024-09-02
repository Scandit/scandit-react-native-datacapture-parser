import { ParsedField } from '../ParsedField';
export interface ParsedFieldJSON {
    name: string;
    parsed: any;
    rawString: string;
    issues?: string[];
}
export interface PrivateParsedField {
    fromJSON(json: ParsedFieldJSON): ParsedField;
}
