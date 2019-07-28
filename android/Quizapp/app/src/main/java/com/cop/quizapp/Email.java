package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Window;

public class Email extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_email);

        try
        {
            this.getSupportActionBar().hide();
            Window window = this.getWindow();
            window.setStatusBarColor(Color.parseColor("#03A9F4"));
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        catch (NullPointerException e){}
    }
}
