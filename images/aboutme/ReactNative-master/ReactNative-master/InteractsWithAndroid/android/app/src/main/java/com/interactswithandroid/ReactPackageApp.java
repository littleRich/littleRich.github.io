package com.interactswithandroid;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/*
 * 项目名:    InteractsWithAndroid
 * 包名       com.interactswithandroid
 * 文件名:    ReactPackageApp
 * 创建者:    ZSY
 * 创建时间:  2017/10/15 on 13:10
 * 描述:     TODO
 */
public class ReactPackageApp implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        //注册模块
        modules.add(new AndroidModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
