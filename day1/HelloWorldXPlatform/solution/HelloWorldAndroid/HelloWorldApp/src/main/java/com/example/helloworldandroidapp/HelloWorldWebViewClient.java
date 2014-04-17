package com.example.helloworldandroidapp;

import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import org.jetbrains.annotations.NotNull;

import java.net.URI;

/**
 * Created by deemadden on 2/13/14.
 */
public class HelloWorldWebViewClient extends WebViewClient {

    private TextView helloWorldTextView;

    public HelloWorldWebViewClient(@NotNull TextView helloWorldLabel) {

        helloWorldTextView = helloWorldLabel;

    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {

        boolean urlMatches = false;
        Uri urlUri;

        if(url != null)
        {
            urlUri = Uri.parse(url);
            String urlHost = urlUri.getHost();
            urlMatches = urlHost != null && urlHost.endsWith("google.com");
        }

        if(urlMatches) {

            Log.d("INTERCEPT - Request intercepted:", url);

            helloWorldTextView.setVisibility(View.VISIBLE);

            return true;
        }

        return false;
    }
}