import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert,AlertController,
  Loading,LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private load:Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl:AlertController,
  public authPro:AuthProvider ,
  public loadCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signIn(){
    if(!this.email && !this.password){
  console.log('enter email and password')
    }
    else{
      this.authPro.signUpUser(this.email,this.password).then(authData=>{
        this.load.dismiss().then(()=>{
          this.navCtrl.setRoot('RoomsPage');
        })
      },error=>{
         this.load.dismiss().then(()=>{
       const alert :Alert =this.alertCtrl.create({
         message:error.message,
         buttons:[{ text:'ok',role:'cancel'}]
       })
       alert.present()
      })
  })
   this.load=this.loadCtrl.create();
   this.load.present()
    }
  

    }//end of method
    
}
