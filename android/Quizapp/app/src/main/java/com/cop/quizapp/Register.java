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

public class Register extends AppCompatActivity {

    private String url = "https://fullernetwork.com/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        try
        {
            this.getSupportActionBar().hide();
            Window window = this.getWindow();
            window.setStatusBarColor(Color.parseColor("#03A9F4"));
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        catch (NullPointerException e){}

        Button submit = findViewById(R.id.registerSubmit);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText firstName = (EditText)findViewById(R.id.fName);
                String fName = firstName.getText().toString();

                EditText lastName = (EditText)findViewById(R.id.lName);
                String lName = lastName.getText().toString();

                EditText password = (EditText) findViewById(R.id.rPassword);
                String pw = password.getText().toString();

                String registerEmail = MyVar.getInstance().email;

                String c = MyVar.getInstance().challenge;

                String[] info = {fName, lName, pw, registerEmail, c};
                onRegister log = new onRegister(Register.this);
                log.execute(info);
            }
        });

    }

    public class onRegister extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        public boolean flag;

        public onRegister(Context context){
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


            String firstName = info[0];
            String lastName = info[1];
            String password = info[2];
            String email = info[3];
            String challengeCode = info[4];

            try {
                URL page =  new URL(url + "api2/students/create.php");

                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);

                if(firstName != "" && lastName != "" && password != "") {

                    JSONObject payload = new JSONObject();
                    payload.put("firstname", firstName);
                    payload.put("lastname", lastName);
                    payload.put("email", email);
                    payload.put("password", password);
                    payload.put("isAdmin", false);
                    payload.put("challenge", challengeCode);
                    payload.put("verified", true);

                    DataOutputStream send = new DataOutputStream(con.getOutputStream());

                    send.writeBytes(payload.toString());

                    send.flush();
                    send.close();

                    con.connect();

                    int code = con.getResponseCode();

                    if(code == 201)
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
                Toast.makeText(context, "Account Successful Created", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(context, Login.class);
                startActivity(intent);
                ((Activity)context).finish();
                Register.this.finish();
            }

            else
            {
                Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
            }
        }

    }
}
