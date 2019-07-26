package com.cop.quizapp;

import org.json.JSONArray;
import org.json.JSONObject;

public class MyVar {
    private static MyVar mInstance = null;

    public static JSONObject response;
    public static String currentQuizName;
    public static int currentID;
    public static JSONArray records;
    public static JSONObject questions;

    protected MyVar() {
    }

    public static synchronized MyVar getInstance() {
        if (null == mInstance) {
            mInstance = new MyVar();
        }
        return mInstance;
    }
}