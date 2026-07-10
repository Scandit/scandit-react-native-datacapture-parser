/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.reactnative.parser

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.scandit.datacapture.frameworks.parser.ParserModule
import com.scandit.datacapture.reactnative.core.utils.ReactNativeResult

typealias Base64String = String

class ScanditDataCaptureParserModule(
    reactContext: ReactApplicationContext,
    private val parserModule: ParserModule
) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private const val DEFAULTS_KEY = "Defaults"
    }

    override fun getName(): String = "ScanditDataCaptureParser"

    override fun getConstants(): MutableMap<String, Any> = mutableMapOf(
        DEFAULTS_KEY to Arguments.createMap()
    )

    override fun invalidate() {
        parserModule.onDestroy()
        super.invalidate()
    }

    @ReactMethod
    fun parseString(parserId: String, data: String, promise: Promise) {
        parserModule.parseString(parserId, data, ReactNativeResult(promise))
    }

    @ReactMethod
    fun parseRawData(parserId: String, data: Base64String, promise: Promise) {
        parserModule.parseRawData(parserId, data, ReactNativeResult(promise))
    }

    @ReactMethod
    fun createUpdateNativeInstance(parserJson: String, promise: Promise) {
        parserModule.createOrUpdateParser(parserJson, ReactNativeResult(promise))
    }

    @ReactMethod
    fun disposeParser(parserId: String, promise: Promise) {
        parserModule.disposeParser(parserId, ReactNativeResult(promise))
    }
}
