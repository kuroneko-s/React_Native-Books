package com.toastsample;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class ToastModule extends ReactContextBaseJavaModule {

    public ToastModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastModule"; // 이 값이 React-Native 내에서 사용할 이름으로 사용됨 import { ToastModule } from ...
    }

    @ReactMethod // JS에서 호출 가능한 애노테이션 ( Decorator 문법 )
    public void show(String message, int duration){
        ReactApplicationContext context = getReactApplicationContext();
        Toast.makeText(context, message, duration).show();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() { // JS에서 Java의 상수들을 접근할 수 있음
        Map<String, Object> constants = new HashMap<>();
        constants.put("SHORT", Toast.LENGTH_SHORT);
        constants.put("LONG", Toast.LENGTH_LONG);
        return constants;
    }
}
