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
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

import javax.net.ssl.HttpsURLConnection;



public class Login extends AppCompatActivity {

    private Button login;
    private Button register;
    private EditText email;
    private EditText password;
    private String url = "https://fullernetwork.com/";
    private String em = "";
    private String pass = "";

    @Override
    public void onBackPressed() {
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

        setContentView(R.layout.activity_main);

        login = (Button)findViewById(R.id.login);
        register = (Button)findViewById(R.id.register);

        email = (EditText)findViewById(R.id.email);
        password = (EditText)findViewById(R.id.password);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openLogin();
            }
        });

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openRegister();
            }
        });
    }

    public void openLogin(){

        em = email.getText().toString();
        pass = password.getText().toString();


        String[] info = {em, pass};
        OnLogin log = new OnLogin(this);
        log.execute(info);


    }

    public void openRegister(){

        Intent reg = new Intent(this, Register.class);
        startActivity(reg);
        finish();

    }

    public class OnLogin extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        public boolean flag;

        public OnLogin(Context context){
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
            String password = info[1];
            try {
                URL page =  new URL(url + "api2/students/login.php");

                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);

                if(email != "" && password != "") {

                    JSONObject payload = new JSONObject();
                    payload.put("email", email);
                    payload.put("password", password);

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

                        MyVar.getInstance().response = new JSONObject(k);
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
                Toast.makeText(context, "Login", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(context, Exams.class);
                startActivity(intent);
                ((Activity)context).finish();
                Login.this.finish();
            }
            else
            {
                Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
            }



        }

    }


}


