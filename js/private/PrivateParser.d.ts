import { PrivateDataCaptureComponent } from 'scandit-react-native-datacapture-core/js/private/PrivateDataCaptureContext';
import { ParserProxy } from '../native/ParserProxy';
import { ParserDataFormat } from '../ParserDataFormat';
export interface PrivateParser extends PrivateDataCaptureComponent {
    dataFormat: ParserDataFormat;
    options: {
        [key: string]: any;
    };
    proxy: ParserProxy;
}
