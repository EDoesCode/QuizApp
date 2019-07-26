package com.cop.quizapp;

import org.json.JSONObject;

public class MyVar {
    private static MyVar mInstance = null;

    public static JSONObject response;

    protected MyVar() {
    }

    public static synchronized MyVar getInstance() {
        if (null == mInstance) {
            mInstance = new MyVar();
        }
        return mInstance;
    }
}