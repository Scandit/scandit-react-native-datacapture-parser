/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (ScanditDataCaptureParser, RCTEventEmitter)
RCT_EXTERN_METHOD(parseString
                  : (NSString *)identifier data
                  : (NSString *)data resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(parseRawData
                  : (NSString *)identifier rawData
                  : (NSString *)data resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createUpdateNativeInstance
                  : (NSString *)parserJson resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(disposeParser
                  : (NSString *)parserId resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject)
@end
