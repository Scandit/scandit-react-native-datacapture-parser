import { PrivateDataCaptureComponent } from 'scandit-datacapture-frameworks-core';
import { ParserProxy } from '../native/ParserProxy';
import { ParserDataFormat } from '../ParserDataFormat';
export interface PrivateParser extends PrivateDataCaptureComponent {
    dataFormat: ParserDataFormat;
    options: {
        [key: string]: any;
    };
    proxy: ParserProxy;
}
