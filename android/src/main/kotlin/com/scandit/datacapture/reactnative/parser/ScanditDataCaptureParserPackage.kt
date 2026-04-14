/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.reactnative.parser

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator
import com.scandit.datacapture.frameworks.parser.ParserModule
import com.scandit.datacapture.reactnative.core.ScanditReactPackageBase

class ScanditDataCaptureParserPackage : ScanditReactPackageBase() {
    private val serviceLocator = DefaultServiceLocator.getInstance()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> {
        val parserFrameworkModule = getParserModule(reactContext)
        return mutableListOf(
            ScanditDataCaptureParserModule(
                reactContext,
                parserFrameworkModule,
                serviceLocator
            )
        )
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<*, *>> = mutableListOf()

    override fun getModuleClasses(): List<Class<out NativeModule>> =
        listOf(ScanditDataCaptureParserModule::class.java)

    private fun getParserModule(reactContext: ReactApplicationContext): ParserModule {
        return ParserModule().also {
            it.onCreate(reactContext)
        }
    }
}
