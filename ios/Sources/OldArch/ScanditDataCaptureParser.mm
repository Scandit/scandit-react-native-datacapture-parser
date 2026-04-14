/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2026- Scandit AG. All rights reserved.
 */

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "ScanditDataCaptureParser.h"
#import "ScanditDataCaptureParser-Swift.h"

// Forward declare and import the shared method queue from Core module
// The actual implementation is in ScanditDataCaptureCore Swift module
@interface SDCSharedMethodQueue : NSObject
+ (dispatch_queue_t)queue;
@end

/// Old Architecture (Paper/Bridge) adapter for the Parser native module.
/// Inherits from RCTEventEmitter and exports methods via RCT_EXPORT_METHOD macros.
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
    [_impl setupWith:self];
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
    [super invalidate];
    [_impl invalidate];
}

// MARK: - Native Module Methods

RCT_EXPORT_METHOD(executeParser
                  : (NSDictionary *)data resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
    [_impl executeParserWithData:data resolve:resolve reject:reject];
}

@end
