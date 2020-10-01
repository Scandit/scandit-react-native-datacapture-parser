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
        let parserDeserializer = ParserDeserializer()
        parserDeserializer.delegate = self

        ScanditDataCaptureCore.register(componentDeserializer: parserDeserializer)
    }
}

extension ScanditDataCaptureParser: ParserDeserializerDelegate {
    func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                            didStartDeserializingParser parser: Parser,
                            from JSONValue: JSONValue) {
    }

    func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                            didFinishDeserializingParser parser: Parser,
                            from JSONValue: JSONValue) {
        parsers[parser.componentId] = parser
    }
}
