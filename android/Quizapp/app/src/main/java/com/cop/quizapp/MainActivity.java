package com.cop.quizapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class MainActivity extends AppCompatActivity {

    private Button login;
    private Button register;
    private EditText email;
    private EditText password;
    private String url = "https://fullernetwork.com/";
    private int flag = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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



        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    URL page =  new URL(url + "api2/students/login.php");

                    HttpsURLConnection con = (HttpsURLConnection) page.openConnection();

                    con.setRequestProperty("Content-Type", "application/json");
                    con.setRequestMethod("POST");
                    con.setDoOutput(true);
                    con.setDoInput(true);

                    if(email.getText().toString() != "" && password.getText().toString() != "") {

                        JSONObject payload = new JSONObject();
                        payload.put("email", email.getText().toString());
                        payload.put("password", password.getText().toString());

                        DataOutputStream send = new DataOutputStream(con.getOutputStream());

                        send.writeBytes(payload.toString());

                        send.flush();
                        send.close();

                        con.connect();

                        int code = con.getResponseCode();

                        if(code == 200)
                        {
                            flag = 1;

                        }
                    }

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        });

        if(flag == 1) {
            Toast.makeText(getApplicationContext(), "login", Toast.LENGTH_SHORT).show();
            Intent log = new Intent(this, Login.class);
            startActivity(log);
        }
        else
        {
            Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
        }

    }

    public void openRegister(){

        Intent reg = new Intent(this, Register.class);
        startActivity(reg);

    }
}
