
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC98mKW9qSPe-ERX5v53wQwMGq9Gf2FzZU",
  authDomain: "first-firebase-project-ae6b9.firebaseapp.com",
  databaseURL: "https://first-firebase-project-ae6b9.firebaseio.com",
  projectId: "first-firebase-project-ae6b9",
  storageBucket: "first-firebase-project-ae6b9.appspot.com",
  messagingSenderId: "280725267978"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);

    const unsubscribe =firebase.auth().onAuthStateChanged(user=>{
      if (!user){
        this.rootPage='LoginPage';
        unsubscribe();
      }
      else{
        this.rootPage='RoomsPage';
        unsubscribe();
      }
    })
    
 
 
  }
}

