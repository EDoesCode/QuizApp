package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

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
        setContentView(R.layout.activity_overview);
    }
}
