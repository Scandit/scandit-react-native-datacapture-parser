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
import com.facebook.react.bridge.ReadableMap
import com.scandit.datacapture.frameworks.core.errors.ParameterNullError
import com.scandit.datacapture.frameworks.parser.ParserModule
import com.scandit.datacapture.reactnative.core.utils.ReactNativeResult

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
    fun parseString(readableMap: ReadableMap, promise: Promise) {
        val parserId = readableMap.getString("parserId")
            ?: return promise.reject(ParameterNullError("parserId"))
        val data = readableMap.getString("data")
            ?: return promise.reject(ParameterNullError("data"))

        parserModule.parseString(parserId, data, ReactNativeResult(promise))
    }

    @ReactMethod
    fun parseRawData(readableMap: ReadableMap, promise: Promise) {
        val parserId = readableMap.getString("parserId")
            ?: return promise.reject(ParameterNullError("parserId"))
        val data = readableMap.getString("data")
            ?: return promise.reject(ParameterNullError("data"))

        parserModule.parseRawData(parserId, data, ReactNativeResult(promise))
    }

    @ReactMethod
    fun createUpdateNativeInstance(readableMap: ReadableMap, promise: Promise) {
        val parserJson = readableMap.getString("parserJson")
            ?: return promise.reject(ParameterNullError("parserJson"))
        parserModule.createOrUpdateParser(parserJson, ReactNativeResult(promise))
    }

    @ReactMethod
    fun disposeParser(readableMap: ReadableMap, promise: Promise) {
        val parserId = readableMap.getString("parserId")
            ?: return promise.reject(ParameterNullError("parserId"))
        parserModule.disposeParser(parserId, ReactNativeResult(promise))
    }

    @ReactMethod
    fun addListener(@Suppress("UNUSED_PARAMETER") eventName: String?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(@Suppress("UNUSED_PARAMETER") count: Int?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }
}
