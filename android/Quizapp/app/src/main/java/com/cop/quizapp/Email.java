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

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Email extends AppCompatActivity {


    private String url = "https://fullernetwork.com/";

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

        Button submit = findViewById(R.id.emailRegister);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText email = findViewById(R.id.emailCheck);
                String em = email.getText().toString();

                MyVar.getInstance().email = em;

                String[] info = {em};
                emailRequest log = new emailRequest(Email.this);
                log.execute(info);

            }
        });

    }

    public class emailRequest extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        public boolean flag;
        public int code;

        public emailRequest(Context context){
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


            String email = info[0];
            try {
                URL page =  new URL(url + "api2/students/getcode.php");

                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);

                if(!email.isEmpty()) {

                    JSONObject payload = new JSONObject();
                    payload.put("email", email);

                    DataOutputStream send = new DataOutputStream(con.getOutputStream());

                    send.writeBytes(payload.toString());

                    send.flush();
                    send.close();

                    con.connect();

                    code = con.getResponseCode();

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
                        MyVar.getInstance().challenge = String.valueOf(response.get("challenge"));
                    }
                    else
                    {

                        flag = false;
                    }
                }

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(JSONObject res) {
            super.onPostExecute(res);

            if(flag)
            {
                Toast.makeText(context, "Register Successful", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(context, Confirmation.class);
                startActivity(intent);
                ((Activity)context).finish();
                Email.this.finish();
            }
            else
            {
                if(code == 400)
                {
                    Toast.makeText(context, "Data is incomplete", Toast.LENGTH_SHORT).show();
                }
                else if(code == 503)
                {
                    Toast.makeText(context, "Unable to generate verification code. Could be duplicate email address.", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    Toast.makeText(context, "Unknown Error", Toast.LENGTH_SHORT).show();
                }
            }

        }

    }
}
