package com.kwipi.processing_free;

import android.os.Bundle;
import android.app.Activity;
//import android.view.Menu;
import android.widget.LinearLayout;
//import com.google.ads.*;
import org.apache.cordova.*;

public class ProcessingFree extends DroidGap {
	
	//private static final String MY_AD_UNIT_ID = "a150589e4167f4a"; 
    //private AdView adView; 

	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);
        super.loadUrl("file:///android_asset/www/index.html");
        
        /*
        adView = new AdView(this, AdSize.BANNER, MY_AD_UNIT_ID); 
        LinearLayout layout = super.root;
        layout.addView(adView); 
        adView.loadAd(new AdRequest()); 
        */
    }
}
