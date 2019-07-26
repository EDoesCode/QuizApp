package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Exams extends AppCompatActivity {

    private Button logout;
    private TextView text;
    private JSONObject response;
    private int top = 500;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        setContentView(R.layout.activity_login);

        logout = findViewById(R.id.logout);


        JSONArray records = null;
        JSONObject name = null;

        String n = "";

        response = MyVar.getInstance().response;

        try {
            records =  response.getJSONArray("records");
            for(int i = 0; i < records.length(); i++)
            {
                name = (JSONObject)records.get(i);
                n = (String) name.get("name");

                addText(n);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent log = new Intent(Exams.this, Login.class);
                startActivity(log);
            }
        });
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
