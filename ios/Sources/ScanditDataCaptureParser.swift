/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

import ScanditParser
import ScanditDataCaptureCore

enum ScanditDataCaptureParserError: Int, CustomNSError {
    case componentNotFound = 1
    case invalidBase64Data = 2
    var domain: String { return "ScanditDataCaptureParserDomain" }

    var code: Int {
        return rawValue
    }

    var message: String {
        switch self {
        case .componentNotFound:
            return "Component not found for specified id."
        case .invalidBase64Data:
            return "Rawdata is not a valid base64 data."
        }
    }

    var errorUserInfo: [String: Any] {
        return [NSLocalizedDescriptionKey: message]
    }
}

@objc(ScanditDataCaptureParser)
class ScanditDataCaptureParser: RCTEventEmitter {
    override init() {
        super.init()
        registerDeserializer()
    }

    @objc override class func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc override var methodQueue: DispatchQueue! {
        return SDCSharedMethodQeueue
    }

    override func supportedEvents() -> [String]! {
        return []
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        return [:]
    }

    var parsers = [String: Parser]()
    func parser(with id: String) -> Parser? {
        defer {
            // We need to remove the parsers if during the last deserialization they were removed.
            if let coreModule =
                bridge.module(for: ScanditDataCaptureCore.self) as? ScanditDataCaptureCore {
                let toBeRemoved = parsers.keys.filter { return !coreModule.hasComponent(with: $0) }
                toBeRemoved.forEach({parsers.removeValue(forKey: $0)})
            }
        }
        return parsers[id]
    }

    @objc(parseString:data:resolver:rejecter:)
    func parseString(id: String, data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        guard let parser = parser(with: id) else {
            let error = ScanditDataCaptureParserError.componentNotFound
            reject(String(error.code), error.message, error)
            return
        }

        do {
            let result = try parser.parseString(data)
            resolve(result.jsonString)
        } catch let error as NSError {
            reject(String(error.code), error.localizedDescription, error)
        }
    }

    @objc(parseRawData:rawData:resolver:rejecter:)
    func parseRawData(id: String, rawData: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        guard let parser = parser(with: id) else {
            let error = ScanditDataCaptureParserError.componentNotFound
            reject(String(error.code), error.message, error)
            return
        }

        guard let data = Data(base64Encoded: rawData) else {
            let error = ScanditDataCaptureParserError.invalidBase64Data
            reject(String(error.code), error.message, error)
            return
        }

        do {
            let result = try parser.parseRawData(data)
            resolve(result.jsonString)
        } catch let error as NSError {
            reject(String(error.code), error.localizedDescription, error)
        }
    }
}
