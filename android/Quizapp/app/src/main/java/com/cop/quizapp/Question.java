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
import android.widget.ImageButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class Question extends AppCompatActivity {

    private TextView txt;
    private ImageButton quest;
    private TextView q;
    private int top = 500;
    private JSONArray questions;
    private Button next;
    private Button back;
    private TextView qnum;
    private RadioGroup answers;
    private Button submit;
    private String url = "https://fullernetwork.com/";

    @Override
    public void onBackPressed() {
        Intent log = new Intent(Question.this, Exams.class);
        startActivity(log);
        finish();
        return;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        try
        {
            this.getSupportActionBar().hide();
            Window window = this.getWindow();
            window.setStatusBarColor(Color.parseColor("#03A9F4"));
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        catch (NullPointerException e){}

        MyVar.getInstance().subFlag = true;

        next = findViewById(R.id.next);
        back = findViewById(R.id.back);
        qnum = findViewById(R.id.qnum);
        answers = findViewById(R.id.answers);
        submit = findViewById(R.id.emailSubmit);
        txt = findViewById(R.id.text);
        txt.setText(MyVar.getInstance().currentQuizName);
        q = findViewById(R.id.question);
        quest = findViewById(R.id.overview);



        try {
            answers.clearCheck();
            submit.setVisibility(View.GONE);
            questions = MyVar.getInstance().questions.getJSONArray("records");
            JSONObject name = null;
            int i = MyVar.getInstance().currentQuestion;


            for(int j = 0; j < questions.length(); j++)
            {
                name = (JSONObject)questions.get(j);
                MyVar.getInstance().qID[j] = Integer.parseInt((String)name.get("questionsid"));
            }

            String s = "Q" + (i+1);
            qnum.setText(s);

            if(i == 0)
            {
                back.setVisibility(View.GONE);
            }

            name = (JSONObject)questions.get(i);
            q.setText( (String) name.get("question"));

            RadioButton a = findViewById(R.id.a);
            a.setVisibility(View.INVISIBLE);
            if(!name.get("a").toString().equals("null")) {
                a.setText(name.get("a").toString());
                a.setVisibility(View.VISIBLE);
                if(("a").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                {
                    a.setChecked(true);
                }

            }

            RadioButton b = findViewById(R.id.b);
            b.setVisibility(View.INVISIBLE);
            if(!name.get("b").toString().equals("null")) {
                b.setText(name.get("b").toString());
                b.setVisibility(View.VISIBLE);
                if(("b").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                {
                    b.setChecked(true);
                }
            }

            RadioButton c = findViewById(R.id.c);
            c.setVisibility(View.INVISIBLE);
            if(!name.get("c").toString().equals("null")) {
                c.setText(name.get("c").toString());
                c.setVisibility(View.VISIBLE);
                if(("c").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                {
                    c.setChecked(true);
                }
            }

            RadioButton d = findViewById(R.id.d);
            d.setVisibility(View.INVISIBLE);
            if(!name.get("d").toString().equals("null")) {
                d.setText(name.get("d").toString());
                d.setVisibility(View.VISIBLE);
                if(("d").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                {
                    d.setChecked(true);
                }
            }

            RadioButton e = findViewById(R.id.e);
            e.setVisibility(View.INVISIBLE);
            if(!name.get("e").toString().equals("null")) {
                e.setText(name.get("e").toString());
                e.setVisibility(View.VISIBLE);
                if("e".equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                {
                    e.setChecked(true);
                }

            }

            //addText(n);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                JSONObject name = null;
                submit.setVisibility(View.GONE);
                try {
                    if(MyVar.getInstance().currentQuestion == questions.length()-1)
                    {
                        next.setVisibility(View.GONE);
                        submit.setVisibility(View.VISIBLE);
                        return;
                    }

                    answers.clearCheck();
                    MyVar.getInstance().currentQuestion++;

                    int i = MyVar.getInstance().currentQuestion;

                    String s = "Q" + (i+1);
                    qnum.setText(s);

                    if(i > 0)
                    {
                        back.setVisibility(View.VISIBLE);
                    }

                    if(i == questions.length()-1)
                    {
                        next.setVisibility(View.GONE);
                        submit.setVisibility(View.VISIBLE);
                    }

                    name = (JSONObject) questions.get(i);
                    q.setText((String) name.get("question"));

                    RadioButton a = findViewById(R.id.a);
                    a.setVisibility(View.INVISIBLE);
                    if(!name.get("a").toString().equals("null")) {
                        a.setText(name.get("a").toString());
                        a.setVisibility(View.VISIBLE);
                        if(("a").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            a.setChecked(true);
                        }

                    }

                    RadioButton b = findViewById(R.id.b);
                    b.setVisibility(View.INVISIBLE);
                    if(!name.get("b").toString().equals("null")) {
                        b.setText(name.get("b").toString());
                        b.setVisibility(View.VISIBLE);
                        if(("b").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            b.setChecked(true);
                        }
                    }

                    RadioButton c = findViewById(R.id.c);
                    c.setVisibility(View.INVISIBLE);
                    if(!name.get("c").toString().equals("null")) {
                        c.setText(name.get("c").toString());
                        c.setVisibility(View.VISIBLE);
                        if(("c").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            c.setChecked(true);
                        }
                    }

                    RadioButton d = findViewById(R.id.d);
                    d.setVisibility(View.INVISIBLE);
                    if(!name.get("d").toString().equals("null")) {
                        d.setText(name.get("d").toString());
                        d.setVisibility(View.VISIBLE);
                        if(("d").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            d.setChecked(true);
                        }
                    }

                    RadioButton e = findViewById(R.id.e);
                    e.setVisibility(View.INVISIBLE);
                    if(!name.get("e").toString().equals("null")) {
                        e.setText(name.get("e").toString());
                        e.setVisibility(View.VISIBLE);
                        if("e".equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            e.setChecked(true);
                        }

                    }

                }
                catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                JSONObject name = null;
                submit.setVisibility(View.GONE);
                try {
                    if(MyVar.getInstance().currentQuestion == 0)
                    {
                        back.setVisibility(View.GONE);
                        return;
                    }

                    answers.clearCheck();
                    MyVar.getInstance().currentQuestion--;

                    int i = MyVar.getInstance().currentQuestion;

                    String s = "Q" + (i+1);
                    qnum.setText(s);

                    if(i == 0)
                    {
                        back.setVisibility(View.GONE);
                    }

                    if(i <= questions.length()-1)
                    {
                        next.setVisibility(View.VISIBLE);
                    }

                    name = (JSONObject) questions.get(i);
                    q.setText((String) name.get("question"));

                    RadioButton a = findViewById(R.id.a);
                    a.setVisibility(View.INVISIBLE);
                    if(!name.get("a").toString().equals("null")) {
                        a.setText(name.get("a").toString());
                        a.setVisibility(View.VISIBLE);
                        if(("a").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            a.setChecked(true);
                        }

                    }

                    RadioButton b = findViewById(R.id.b);
                    b.setVisibility(View.INVISIBLE);
                    if(!name.get("b").toString().equals("null")) {
                        b.setText(name.get("b").toString());
                        b.setVisibility(View.VISIBLE);
                        if(("b").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            b.setChecked(true);
                        }
                    }

                    RadioButton c = findViewById(R.id.c);
                    c.setVisibility(View.INVISIBLE);
                    if(!name.get("c").toString().equals("null")) {
                        c.setText(name.get("c").toString());
                        c.setVisibility(View.VISIBLE);
                        if(("c").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            c.setChecked(true);
                        }
                    }

                    RadioButton d = findViewById(R.id.d);
                    d.setVisibility(View.INVISIBLE);
                    if(!name.get("d").toString().equals("null")) {
                        d.setText(name.get("d").toString());
                        d.setVisibility(View.VISIBLE);
                        if(("d").equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            d.setChecked(true);
                        }
                    }

                    RadioButton e = findViewById(R.id.e);
                    e.setVisibility(View.INVISIBLE);
                    if(!name.get("e").toString().equals("null")) {
                        e.setText(name.get("e").toString());
                        e.setVisibility(View.VISIBLE);
                        if("e".equals(MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion]))
                        {
                            e.setChecked(true);
                        }

                    }

                }
                catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        quest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent quest = new Intent(Question.this, Overview.class);
                startActivity(quest);
                finish();
            }
        });


        answers.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                RadioButton select = findViewById(i);

                switch(i)
                {
                    case(R.id.a):
                        MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion] = "a";
                        break;

                    case(R.id.b):
                        MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion] = "b";
                        break;

                    case(R.id.c):
                        MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion] = "c";
                        break;
                    case(R.id.d):
                        MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion] = "d";
                        break;

                    case(R.id.e):
                        MyVar.getInstance().qTracker[MyVar.getInstance().currentQuestion] = "e";
                        break;
                }


            }
        });

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                for(int i = 0; i < MyVar.getInstance().qTracker.length ; i++) {

                    String stID = String.valueOf(MyVar.getInstance().studentID);
                    String cID = null;
                    try {
                        JSONObject q = (JSONObject) questions.get(MyVar.getInstance().currentQuestion);
                        cID = (String) q.get("examsid");

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    int questionid = MyVar.getInstance().qID[i];
                    String answered = MyVar.getInstance().qTracker[i];

                    String[] info = {cID, stID, String.valueOf(questionid), answered};
                    SendResults fetch = new SendResults(Question.this);
                    fetch.execute(info);

                }


                if(MyVar.getInstance().subFlag)
                {
                    Toast.makeText(Question.this, "Submit", Toast.LENGTH_SHORT).show();
                    Intent score = new Intent(Question.this, Score.class);
                    startActivity(score);
                    MyVar.getInstance().subFlag = false;
                    Question.this.finish();
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "error", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public class SendResults extends AsyncTask<String, Void, JSONObject>
    {
        private Context context;
        private boolean flag;

        public SendResults(Context context){
            this.context=context;
            flag = true;
        }
        @Override
        protected void onPreExecute() {
            // write show progress Dialog code here
            super.onPreExecute();
        }

        @Override
        protected JSONObject doInBackground(String... info) {

            String examsid = info[0];
            String studentsid = info[1];
            String questionid = info[2];
            String answered = info[3];

            try {

                URL page =  new URL(url + "api2/examresults/create.php");
                HttpsURLConnection con = (HttpsURLConnection) page.openConnection();
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestMethod("POST");
                con.setDoOutput(true);
                con.setDoInput(true);

                JSONObject payload = new JSONObject();
                payload.put("questionsid", Integer.parseInt(questionid));
                payload.put("examsid", Integer.parseInt(examsid));
                payload.put("studentsid", Integer.parseInt(studentsid));
                payload.put("answered", answered);

                DataOutputStream send = new DataOutputStream(con.getOutputStream());
                send.writeBytes(payload.toString());
                send.flush();
                send.close();
                con.connect();
                int code = con.getResponseCode();

                if(code != 201)
                    flag = false;

                return payload;

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
            if(flag == false)
                MyVar.getInstance().subFlag = flag;
            ((Activity)context).finish();
        }

    }
}
