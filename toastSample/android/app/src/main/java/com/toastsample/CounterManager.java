package com.toastsample;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class CounterManager extends SimpleViewManager<CounterView> {
    static final String REACT_CLASS = "Counter";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS; // JS 에서 불러올 이름
    }

    @NonNull
    @Override
    protected CounterView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new CounterView(reactContext);
    }

    // Props 연동
    // 이 메서드들은 컴포넌트가 처음 화면에 나타나거나 Props가 바뀔 때마다 호출된다.
    @ReactProp(name = "leftButtonText")
    public void setLeftButtonText(CounterView view, String text) {
        view.setLeftButtonText(text);
    }

    @ReactProp(name = "rightButtonText")
    public void setRightButtonText(CounterView view, String text) {
        view.setRightButtonText(text);
    }

    @ReactProp(name = "value")
    public void setValue(CounterView view, int text) {
        view.setValue(text);
    }
}
