/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

import React
import ScanditDataCaptureCore
import ScanditFrameworksParser

@objc(ScanditDataCaptureParser)
class ScanditDataCaptureParser: RCTEventEmitter {
    var parserModule: ParserModule

    override init() {
        parserModule = ParserModule()
        super.init()
        parserModule.didStart()
    }

    @objc override class func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc override var methodQueue: DispatchQueue! {
        return sdcSharedMethodQueue
    }

    override func supportedEvents() -> [String]! {
        return []
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        return [:]
    }

    @objc(parseString:data:resolver:rejecter:)
    func parseString(id: String,
                     data: String,
                     resolve: @escaping RCTPromiseResolveBlock,
                     reject: @escaping RCTPromiseRejectBlock) {
        parserModule.parse(string: data, id: id, result: ReactNativeResult(resolve, reject))
    }

    @objc(parseRawData:rawData:resolver:rejecter:)
    func parseRawData(id: String,
                      rawData: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        parserModule.parse(data: rawData, id: id, result: ReactNativeResult(resolve, reject))
    }

    @objc(createUpdateNativeInstance:resolver:rejecter:)
    func createUpdateNativeInstance(parserJson: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        parserModule.createOrUpdateParser(parserJson: parserJson, result: ReactNativeResult(resolve, reject))
    }

    @objc(disposeParser:resolver:rejecter:)
    func disposeParser(parserId: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        parserModule.disposeParser(parserId: parserId, result: ReactNativeResult(resolve, reject))
    }

    @objc override func invalidate() {
        parserModule.didStop()
        super.invalidate()
    }

    deinit {
        invalidate()
    }
}
