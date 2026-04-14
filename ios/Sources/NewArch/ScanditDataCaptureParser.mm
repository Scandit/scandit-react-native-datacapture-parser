/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2026- Scandit AG. All rights reserved.
 */

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <ScanditReactNativeDatacaptureParserSpec/ScanditReactNativeDatacaptureParserSpec.h>
#import <ReactCommon/RCTTurboModule.h>
#import "ScanditDataCaptureParser.h"
#import "ScanditDataCaptureParser-Swift.h"

// Forward declare and import the shared method queue from Core module
// The actual implementation is in ScanditDataCaptureCore Swift module
@interface SDCSharedMethodQueue : NSObject
+ (dispatch_queue_t)queue;
@end

/// New Architecture (TurboModule) adapter for the Parser native module.
/// Inherits from the generated spec base class and uses direct method declarations.
@implementation NativeScanditDataCaptureParser {
    ScanditDataCaptureParserImpl *_impl;
}

RCT_EXPORT_MODULE(ScanditDataCaptureParser)

- (instancetype)init {
    if (self = [super init]) {
        _impl = [[ScanditDataCaptureParserImpl alloc] init];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)initialize {
    __weak NativeScanditDataCaptureParser *weakSelf = self;
    SDCEventEmitBlock emitterBlock = ^(NSDictionary *_Nonnull payload) {
        __strong NativeScanditDataCaptureParser *strongSelf = weakSelf;
        if (strongSelf) {
            [strongSelf emitOnScanditEvent:payload];
        }
    };
    [_impl setupWith:nil turboEmitter:emitterBlock];
}

- (dispatch_queue_t)methodQueue {
    return [SDCSharedMethodQueue queue];
}

- (NSDictionary *)constantsToExport {
    return [_impl getConstants];
}

- (NSDictionary *)getConstants {
    return [_impl getConstants];
}

- (NSArray<NSString *> *)supportedEvents {
    return [_impl supportedEvents];
}

- (void)invalidate {
    [_impl invalidate];
}

// MARK: - Native Module Methods

- (void)executeParser:(NSDictionary *)data
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {
    [_impl executeParserWithData:data resolve:resolve reject:reject];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeScanditDataCaptureParserSpecJSI>(params);
}

@end
