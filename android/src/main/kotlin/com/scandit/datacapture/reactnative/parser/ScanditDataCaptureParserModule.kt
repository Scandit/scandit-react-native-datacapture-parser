/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.reactnative.parser

import android.util.Base64
import androidx.annotation.VisibleForTesting
import com.facebook.react.bridge.*
import com.scandit.datacapture.core.json.JsonValue
import com.scandit.datacapture.frameworks.core.deserialization.DeserializationLifecycleObserver
import com.scandit.datacapture.frameworks.core.deserialization.Deserializers
import com.scandit.datacapture.parser.Parser
import com.scandit.datacapture.parser.serialization.ParserDeserializer
import com.scandit.datacapture.parser.serialization.ParserDeserializerListener
import com.scandit.datacapture.reactnative.core.utils.Error
import com.scandit.datacapture.reactnative.core.utils.reject

typealias Base64String = String

class ScanditDataCaptureParserModule(
    private val reactContext: ReactApplicationContext,
    private val parserDeserializer: ParserDeserializer = ParserDeserializer()
) : ReactContextBaseJavaModule(reactContext),
    ParserDeserializerListener,
    DeserializationLifecycleObserver.Observer {
    companion object {
        private const val DEFAULTS_KEY = "Defaults"

        private val ERROR_INVALID_PARSER_ID =
            Error(1, "The parser id does not match the current parser id.")
        private val ERROR_PARSER_FAILURE =
            Error(2, "Parser error: %s")
        private val ERROR_INVALID_BASE_64 =
            Error(3, "Invalid Base64.")
    }

    override fun getName(): String = "ScanditDataCaptureParser"

    override fun getConstants(): MutableMap<String, Any> = mutableMapOf(
        DEFAULTS_KEY to Arguments.createMap()
    )

    @VisibleForTesting
    var parsers: MutableMap<String, Parser> = mutableMapOf()

    init {
        parserDeserializer.listener = this
        Deserializers.Factory.addComponentDeserializer(parserDeserializer)

        DeserializationLifecycleObserver.attach(this)
    }

    override fun invalidate() {
        DeserializationLifecycleObserver.detach(this)

        Deserializers.Factory.removeComponentDeserializer(parserDeserializer)
        parserDeserializer.listener = null

        parsers.clear()
        super.invalidate()
    }

    @ReactMethod
    fun parseString(parserId: String, data: String, promise: Promise) {
        val parser = parsers[parserId] ?: run {
            promise.reject(ERROR_INVALID_PARSER_ID)

            return
        }

        val parsedData = try {
            parser.parseString(data)
        } catch (e: RuntimeException) {
            promise.reject(ERROR_PARSER_FAILURE, e.message)

            return
        }

        promise.resolve(parsedData.jsonString)
    }

    @ReactMethod
    fun parseRawData(parserId: String, data: Base64String, promise: Promise) {
        val parser = parsers[parserId] ?: run {
            promise.reject(ERROR_INVALID_PARSER_ID)

            return
        }

        val base64Bytes = try {
            Base64.decode(data, 0)
        } catch (e: IllegalArgumentException) {
            println(e)
            promise.reject(ERROR_INVALID_BASE_64)

            return
        }

        val parsedData = try {
            parser.parseRawData(base64Bytes)
        } catch (e: RuntimeException) {
            promise.reject(ERROR_PARSER_FAILURE, e.message)

            return
        }

        promise.resolve(parsedData.jsonString)
    }

    override fun onParserDeserializationFinished(
        deserializer: ParserDeserializer,
        parser: Parser,
        json: JsonValue
    ) {
        parsers[parser.id] = parser
    }

    override fun onDataCaptureContextDisposed() {
        parsers.clear()
    }

    override fun onParsersRemoved() {
        parsers.clear()
    }
}
