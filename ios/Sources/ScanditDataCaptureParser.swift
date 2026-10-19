/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

import React
import ScanditDataCaptureCore
import ScanditFrameworksCore
import ScanditFrameworksParser

/// Swift implementation for the Parser native module.
/// This class contains all business logic and is used by the Obj-C++ adapter (NativeScanditDataCaptureParser).
/// Following the Adapter Pattern from React Native's TurboModule Swift guide.
@objcMembers
public class ScanditDataCaptureParserImpl: NSObject {
    var parserModule: ParserModule!

    /// Reference to the RCTEventEmitter adapter.
    weak var emitter: RCTEventEmitter?

    public override init() {
        super.init()
    }

    /// Called by the Obj-C++ adapter to set up the emitter reference and initialize modules.
    public func setup(with emitter: RCTEventEmitter) {
        self.emitter = emitter
        initializeModules()
    }

    /// Called by the Obj-C++ adapter to set up the emitter reference and initialize modules (new architecture).
    /// - Parameters:
    ///   - emitter: The RCTEventEmitter (nil in new arch since we don't inherit from RCTEventEmitter).
    ///   - turboEmitter: TurboModule emitter block for new architecture.
    @objc(setupWith:turboEmitter:)
    public func setup(with emitter: RCTEventEmitter?, turboEmitter: SDCEventEmitBlock?) {
        self.emitter = emitter
        guard
            let reactEmitter = ScanditDataCaptureCore.ReactNativeEmitterFactory.create(
                emitter: emitter,
                turboEmitter: turboEmitter
            )
        else {
            fatalError("Failed to create ReactNativeEmitter")
        }
        initializeModules()
    }

    private func initializeModules() {
        // Note: ParserModule doesn't emit events
        parserModule = ParserModule()
        parserModule.didStart()

    }

    public func supportedEvents() -> [String] {
        []
    }

    public func getConstants() -> [AnyHashable: Any] {
        [:]
    }

    public func executeParser(
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

    public func invalidate() {
        parserModule.didStop()
    }
}
