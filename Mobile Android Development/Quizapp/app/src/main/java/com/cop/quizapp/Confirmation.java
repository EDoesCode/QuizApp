package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Confirmation extends AppCompatActivity {

    private String url = "https://fullernetwork.com/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirmation);

        try
        {
            this.getSupportActionBar().hide();
            Window window = this.getWindow();
            window.setStatusBarColor(Color.parseColor("#03A9F4"));
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        catch (NullPointerException e){}

        Button submit = findViewById(R.id.codeSubmit);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText code = findViewById(R.id.codeCheck);
                String c = code.getText().toString();

                MyVar.getInstance().code = c;

                if(c.equals(MyVar.getInstance().challenge))
                {
                    Toast.makeText(Confirmation.this, "Confirmed", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(Confirmation.this, Register.class);
                    startActivity(intent);
                    Confirmation.this.finish();

                }
                else
                {
                    Toast.makeText(Confirmation.this, "Invalid Code", Toast.LENGTH_SHORT).show();
                }

            }
        });

    }
}
