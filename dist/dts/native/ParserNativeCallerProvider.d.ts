import { NativeCaller } from 'scandit-datacapture-frameworks-core';
import { ParserNativeCallerProvider, ParserProxyType } from 'scandit-datacapture-frameworks-parser';
export declare class RNParserNativeCallerProvider implements ParserNativeCallerProvider {
    getNativeCaller(proxyType: ParserProxyType): NativeCaller;
}
