/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

import Foundation
import ScanditParser
import ScanditDataCaptureCore

extension ScanditDataCaptureParser {
    func registerDeserializer() {
        parserDeserializer.delegate = self
        ScanditDataCaptureCore.register(componentDeserializer: parserDeserializer)
    }
    
    func unregisterDeserializer() {
        parserDeserializer.delegate = nil
        ScanditDataCaptureCore.unregister(componentDeserializer: parserDeserializer)
    }
}

extension ScanditDataCaptureParser: ParserDeserializerDelegate {
    func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                            didStartDeserializingParser parser: Parser,
                            from jsonValue: JSONValue) {
        // Empty on purpose
    }

    func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                            didFinishDeserializingParser parser: Parser,
                            from jsonValue: JSONValue) {
        parsers[parser.componentId] = parser
    }
}
