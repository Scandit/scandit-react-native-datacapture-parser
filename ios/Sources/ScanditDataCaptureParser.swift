/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

import React
import ScanditDataCaptureCore
import ScanditFrameworksCore
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
        true
    }

    @objc override var methodQueue: DispatchQueue! {
        sdcSharedMethodQueue
    }

    override func supportedEvents() -> [String]! {
        []
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        [:]
    }

    @objc(parseString:resolver:rejecter:)
    func parseString(
        _ data: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let stringToParse = data["data"] as? String else {
            reject("-1", "Missing data field", nil)
            return
        }
        guard let parserId = data["parserId"] as? String else {
            reject("-1", "Missing parserId field", nil)
            return
        }
        parserModule.parse(string: stringToParse, id: parserId, result: ReactNativeResult(resolve, reject))
    }

    @objc(parseRawData:resolver:rejecter:)
    func parseRawData(
        _ data: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let rawData = data["data"] as? String else {
            reject("-1", "Missing data field", nil)
            return
        }
        guard let parserId = data["parserId"] as? String else {
            reject("-1", "Missing parserId field", nil)
            return
        }
        parserModule.parse(data: rawData, id: parserId, result: ReactNativeResult(resolve, reject))
    }

    @objc(createUpdateNativeInstance:resolver:rejecter:)
    func createUpdateNativeInstance(
        _ data: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let parserJson = data["parserJson"] as? String else {
            reject("-1", "Missing parserJson field", nil)
            return
        }
        parserModule.createOrUpdateParser(parserJson: parserJson, result: ReactNativeResult(resolve, reject))
    }

    @objc(disposeParser:resolver:rejecter:)
    func disposeParser(
        _ data: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let parserId = data["parserId"] as? String else {
            reject("-1", "Missing parserId field", nil)
            return
        }
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
