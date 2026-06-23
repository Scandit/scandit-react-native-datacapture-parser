/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.reactnative.parser

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.scandit.datacapture.frameworks.core.CoreModule
import com.scandit.datacapture.frameworks.core.FrameworkModule
import com.scandit.datacapture.frameworks.core.locator.ServiceLocator
import com.scandit.datacapture.frameworks.parser.ParserModule
import com.scandit.datacapture.reactnative.core.utils.ReactNativeMethodCall
import com.scandit.datacapture.reactnative.core.utils.ReactNativeResult

/**
 * Base implementation for the Scandit Data Capture Parser module.
 * Contains all shared business logic used by both old and new architecture modules.
 */
class ScanditDataCaptureParserModuleBase(
    private val parserModule: ParserModule,
    private val serviceLocator: ServiceLocator<FrameworkModule>,
) {
    companion object {
        const val NAME = "ScanditDataCaptureParser"
        private const val DEFAULTS_KEY = "Defaults"
    }

    fun getDefaults(): MutableMap<String, Any> = mutableMapOf(
        DEFAULTS_KEY to Arguments.createMap()
    )

    fun onInvalidate() {
        parserModule.onDestroy()
    }

    fun executeParser(data: ReadableMap, promise: Promise) {
        val coreModule = serviceLocator.resolve(
            CoreModule::class.java.simpleName
        ) as? CoreModule ?: return run {
            promise.reject("-1", "Unable to retrieve the CoreModule from the locator.")
        }

        val result = coreModule.execute(
            ReactNativeMethodCall(data),
            ReactNativeResult(promise),
            parserModule
        )

        if (!result) {
            val methodName = data.getString("methodName") ?: "unknown"
            promise.reject(
                "METHOD_NOT_FOUND",
                "Unknown Core method: $methodName"
            )
        }
    }
}
