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

    @objc(executeParser:resolve:reject:)
    func executeParser(
        data: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {

        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            reject("-1", "Unable to retrieve the CoreModule from the locator.", nil)
            return
        }

        let result = ReactNativeResult(resolve, reject)
        let handled = coreModule.execute(
            ReactNativeMethodCall(data),
            result: result,
            module: parserModule
        )

        if !handled {
            let methodName = data["methodName"] as? String ?? "unknown"
            reject("METHOD_NOT_FOUND", "Unknown Core method: \(methodName)", nil)
        }
    }

    @objc override func invalidate() {
        parserModule.didStop()
        super.invalidate()
    }

    deinit {
        invalidate()
    }
}
