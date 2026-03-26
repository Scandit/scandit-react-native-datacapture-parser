import { registerParserProxies, PARSER_PROXY_TYPE_NAMES } from './parser.js';
export { ParsedData, ParsedField, Parser, ParserDataFormat, ParserIssue, ParserIssueAdditionalInfoKey, ParserIssueCode } from './parser.js';
import { getNativeModule, createRNNativeCaller } from 'scandit-react-native-datacapture-core';
import 'scandit-react-native-datacapture-core/dist/core';

class RNParserNativeCallerProvider {
    getNativeCaller(proxyType) {
        if (!PARSER_PROXY_TYPE_NAMES.includes(proxyType)) {
            throw new Error(`No native module mapped for proxy type: ${proxyType}`);
        }
        // Use getNativeModule which handles both TurboModules and legacy modules
        const nativeModule = getNativeModule('ScanditDataCaptureParser');
        return createRNNativeCaller(nativeModule);
    }
}

function initParserProxy() {
    registerParserProxies(new RNParserNativeCallerProvider());
}

initParserProxy();
