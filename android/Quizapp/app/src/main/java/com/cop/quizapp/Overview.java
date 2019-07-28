package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.Window;

public class Overview extends AppCompatActivity {

    @Override
    public void onBackPressed() {
        finish();
        Intent log = new Intent(Overview.this, Question.class);
        startActivity(log);
        finish();
        return;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try
        {
            this.getSupportActionBar().hide();
            Window window = this.getWindow();
            window.setStatusBarColor(Color.parseColor("#03A9F4"));
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        catch (NullPointerException e){}

        setContentView(R.layout.activity_overview);

    }
}
