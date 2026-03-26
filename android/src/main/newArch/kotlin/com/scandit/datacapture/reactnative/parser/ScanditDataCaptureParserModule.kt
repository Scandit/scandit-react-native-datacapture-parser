/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.reactnative.parser

import com.facebook.fbreact.specs.NativeScanditDataCaptureParserSpec
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.scandit.datacapture.frameworks.core.FrameworkModule
import com.scandit.datacapture.frameworks.core.locator.ServiceLocator
import com.scandit.datacapture.frameworks.parser.ParserModule

@ReactModule(name = ScanditDataCaptureParserModuleBase.NAME)
class ScanditDataCaptureParserModule(
    reactContext: ReactApplicationContext,
    parserModule: ParserModule,
    serviceLocator: ServiceLocator<FrameworkModule>,
) : NativeScanditDataCaptureParserSpec(reactContext) {

    private val moduleBase = ScanditDataCaptureParserModuleBase(parserModule, serviceLocator)

    companion object {
        const val NAME = ScanditDataCaptureParserModuleBase.NAME
    }

    override fun getName(): String = NAME

    override fun getTypedExportedConstants(): MutableMap<String, Any> = moduleBase.getDefaults()

    override fun invalidate() {
        moduleBase.onInvalidate()
        super.invalidate()
    }

    override fun executeParser(data: ReadableMap, promise: Promise) =
        moduleBase.executeParser(data, promise)
}
