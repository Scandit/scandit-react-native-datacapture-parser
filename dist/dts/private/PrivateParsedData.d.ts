import { ParsedData } from '../ParsedData';
import { ParsedFieldJSON } from './PrivateParsedField';
export type ParsedDataJSON = [ParsedFieldJSON];
export interface PrivateParsedData {
    fromJSON(json: ParsedDataJSON): ParsedData;
}
