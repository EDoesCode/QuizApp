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
import android.view.Window;
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
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Score extends AppCompatActivity {

    private String url = "https://fullernetwork.com/";
    private TextView sc;

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

        setContentView(R.layout.activity_score);

        sc = findViewById(R.id.score);
        sc.setVisibility(View.INVISIBLE);

        String studentsid = String.valueOf(MyVar.getInstance().studentID);
        String examsid = null;
        try {
            JSONArray questions = MyVar.getInstance().questions.getJSONArray("records");
            JSONObject q = (JSONObject) questions.get(MyVar.getInstance().currentQuestion);
            examsid = (String) q.get("examsid");

        } catch (JSONException e) {
            e.printStackTrace();
        }

        String[] info = {examsid, studentsid};
        FetchResults log = new FetchResults(this);
        log.execute(info);


    }

    public class FetchResults extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        private boolean flag;

        public FetchResults(Context context){
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


            String examsid = info[0];
            String studentid = info[1];

            try {
                URL page =  new URL(url + "api2/examresults/getscore.php");

                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);


                JSONObject payload = new JSONObject();
                payload.put("examsid", Integer.parseInt(examsid));
                payload.put("studentsid", Integer.parseInt(studentid));

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
                    JSONObject response = new JSONObject(k);
                    MyVar.getInstance().results = response;
                    return response;
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
                try {
                    TextView sc = findViewById(R.id.score);
                    Double score = Double.parseDouble((String) res.get("Score"));
                    sc.setText((score*100)+"%");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                sc.setVisibility(View.VISIBLE);
                Toast.makeText(context, "Results", Toast.LENGTH_SHORT).show();
            }
            else
            {
                Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
            }
        }

    }
}
