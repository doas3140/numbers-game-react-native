package com.numbersgame;

import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Color;
import android.view.Gravity;
import android.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;


public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout(){
        
        LinearLayout view = new LinearLayout(this);
        view.setBackgroundColor(Color.parseColor("#607D8B"));
        view.setGravity(Gravity.CENTER);

        // TextView textView = new TextView(this);
        // textView.setTextColor(Color.parseColor("#FFFFFFF0"));
        // textView.setText("Numbers Game");
        // textView.setGravity(Gravity.CENTER);
        // textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP,40);
        // view.addView(textView);

        return view;
    }
}
