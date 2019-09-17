package com.interactswithandroid;

import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/*
 * 项目名:    InteractsWithAndroid
 * 包名       com.interactswithandroid
 * 文件名:    AndroidModule
 * 创建者:    ZSY
 * 创建时间:  2017/10/15 on 13:08
 * 描述:     TODO JavaScrips 与Android原生代码交互
 */
public class AndroidModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    public AndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "AndroidModule";
    }

    //返回给JavaScrips使用的变量
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("TEL", "10010");
        return constants;
    }

    @ReactMethod
    public void callPhone(String tel) {
        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + tel));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * 带返回结果的函数
     */
    @ReactMethod
    public void haveCallback(int a, int b, Callback callback) {
        int sum = a + b;
        //返回结果
        callback.invoke(sum);
    }

    @ReactMethod
    public void startDetailsActivity() {
        Intent intent = new Intent(context, DetailsActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @ReactMethod
    public void showToast(String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void sendEvent() {
        sendEvent("测试事件");
    }

    private void sendEvent(String eventName) {
        WritableMap params = Arguments.createMap();
        params.putString("NAME", "阿钟");
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
