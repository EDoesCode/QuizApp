package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Exams extends AppCompatActivity {

    private Button logout;
    private JSONObject response;
    public RadioGroup gr;
    private String url = "https://fullernetwork.com/";

    @Override
    public void onBackPressed() {

        Intent log = new Intent(Exams.this, Login.class);
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

        setContentView(R.layout.activity_login);

        logout = findViewById(R.id.logout);
        gr = findViewById(R.id.quizes);


        JSONArray records = null;
        JSONObject name = null;

        String n = "";

        response = MyVar.getInstance().response;

        try {
            records =  response.getJSONArray("records");
            MyVar.getInstance().records = records;

            for(int i = 0; i < records.length(); i++)
            {
                name = (JSONObject)records.get(i);
                n = (String) name.get("name");
                MyVar.getInstance().studentID = Integer.parseInt((String) name.get("studentsid"));

                addText(n, i);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        gr.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                RadioButton select = findViewById(i);
                String name = (String) select.getText();
                MyVar.getInstance().currentID = i;
                Toast.makeText(Exams.this, "Starting " + name, Toast.LENGTH_SHORT).show();
                MyVar.getInstance().currentQuizName = name;


                String n = "";
                try {
                    JSONObject records = (JSONObject)(MyVar.getInstance().records.get(i));
                    n = (String)(records).get("id");
                    MyVar.getInstance().currentQuestion = 0;
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                String[] info = {n};
                FetchQuestions fetch = new FetchQuestions(Exams.this);
                fetch.execute(info);

            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent log = new Intent(Exams.this, Login.class);
                startActivity(log);
            }
        });


    }

    public void addText(String n, int id)
    {
        RadioButton ex = new RadioButton(this);
        ex.setId(id);
        ex.setText(n);
        LinearLayout.LayoutParams parameter = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT, 1f);

        ex.setLayoutParams(parameter);

        gr.addView(ex);
    }


    public class FetchQuestions extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        private boolean flag;

        public FetchQuestions(Context context){
            this.context=context;
            flag = false;
        }
        @Override
        protected void onPreExecute() {
            // write show progress Dialog code here
            super.onPreExecute();
        }

        @Override
        protected JSONObject doInBackground(String... info) {


            String id = info[0];
            try {
                URL page =  new URL(url + "api2/questions2exams/readByExamID.php");

                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);


                JSONObject payload = new JSONObject();
                payload.put("examsid", Integer.parseInt(id));

                DataOutputStream send = new DataOutputStream(con.getOutputStream());
                send.writeBytes(payload.toString());
                send.flush();
                send.close();
                con.connect();
                int code = con.getResponseCode();

                if(code == 200)
                {
                    flag = true;
                    String k = "";
                    String line = "";
                    InputStreamReader isr = new InputStreamReader(con.getInputStream());
                    BufferedReader reader = new BufferedReader(isr);
                    StringBuilder sb = new StringBuilder();
                    while ((line = reader.readLine()) != null)
                    {
                        sb.append(line);
                    }
                    k = sb.toString();
                    k = k.replaceAll("\"", "\\\"");
                    MyVar.getInstance().questions = new JSONObject(k);
                    JSONArray questions = MyVar.getInstance().questions.getJSONArray("records");
                    MyVar.getInstance().qID = new int[questions.length()];
                    MyVar.getInstance().qTracker = new String[questions.length()];

                }
                else {
                    flag = false;
                }
            } catch (IOException e1) {
                e1.printStackTrace();
            } catch (JSONException e1) {
                e1.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(JSONObject res) {
            super.onPostExecute(res);
            if(flag)
            {
                Toast.makeText(context, "Questions", Toast.LENGTH_SHORT).show();
                Intent quest = new Intent(context, Question.class);
                startActivity(quest);
                ((Activity)context).finish();
                Exams.this.finish();
            }
            else
            {
                Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
            }



        }

    }

}
