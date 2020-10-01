import { DataCaptureComponent, DataCaptureContext } from 'scandit-react-native-datacapture-core/js/DataCaptureContext';
import { DefaultSerializeable } from 'scandit-react-native-datacapture-core/js/private/Serializeable';
import { ParsedData } from './ParsedData';
import { ParserDataFormat } from './ParserDataFormat';
export declare class Parser extends DefaultSerializeable implements DataCaptureComponent {
    private type;
    private dataFormat;
    private options;
    private _id;
    get id(): string;
    private _context;
    private proxy;
    static forContextAndFormat(context: DataCaptureContext, dataFormat: ParserDataFormat): Promise<Parser>;
    private constructor();
    setOptions(options: {
        [key: string]: any;
    }): Promise<void>;
    parseString(data: string): Promise<ParsedData>;
    parseRawData(data: string): Promise<ParsedData>;
}
