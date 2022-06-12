package com.toastsample;

import android.view.LayoutInflater;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.uimanager.events.RCTModernEventEmitter;
import com.toastsample.databinding.CounterViewBinding;

public class CounterView extends FrameLayout {
    private CounterViewBinding binding;
    private ReactContext context;

    public CounterView(@NonNull ReactContext context) {
        super(context);
        this.context = context;
        // gradle 에 설정을 추가하면 레이아웃 이름을 PascalCase 네이밍 규칙으로 변환 후 ViewBinding 키워드를 붙여서 만들어줌
        // ( layout이랑 class랑 자동으로 결합되어 있어서 inflate로 (context, layout_name, viewgroup 을 안넘겨도 됨 )
        LayoutInflater inflater = LayoutInflater.from(context);
        binding = CounterViewBinding.inflate(inflater, this, true);
        setupEvents();
    }

    public void setLeftButtonText(String text) {
        binding.button3.setText(text);
    }

    public void setRightButtonText(String text) {
        binding.button2.setText(text);
    }

    public void setValue(int text) {
        binding.textView.setText(text);
    }

    public void setupEvents() {
        RCTModernEventEmitter jsModule = context.getJSModule(RCTModernEventEmitter.class);
        binding.button3.setOnClickListener(v -> {
            jsModule.receiveEvent(v.getId(), "pressLeftButton", null);
        });

        binding.button2.setOnClickListener(v -> {
            jsModule.receiveEvent(v.getId(), "pressRightButton", null);
        });
    }

}
