package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Question extends AppCompatActivity {

    private TextView txt;
    private int top = 500;
    private JSONArray questions;

    @Override
    public void onBackPressed() {
        Intent log = new Intent(Question.this, Exams.class);
        startActivity(log);
        return;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        txt = findViewById(R.id.text);
        txt.setText(MyVar.getInstance().currentQuizName);

        try {
            questions = MyVar.getInstance().questions.getJSONArray("records");
            JSONObject name = null;
            for(int i = 0; i < questions.length(); i++)
            {
                name = (JSONObject)questions.get(i);
                String n = (String) name.get("question");

                addText(n);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public void addText(String n)
    {
        TextView ex = new TextView(this);
        ex.setText(n);
        RelativeLayout.LayoutParams parameter = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);

        parameter.addRule(RelativeLayout.ALIGN_PARENT_TOP);
        parameter.addRule(RelativeLayout.CENTER_HORIZONTAL);

        parameter.setMargins(parameter.leftMargin, top, parameter.rightMargin, parameter.bottomMargin);

        top += 200;

        ex.setLayoutParams(parameter);

        RelativeLayout rl = findViewById(R.id.layout);
        rl.addView(ex);
    }
}
