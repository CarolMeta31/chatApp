import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { AlertController,Alert,LoadingController,
  Loading,IonicPage, NavController} from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private load:Loading;

  email:string;
  password:string;

  constructor(public navCtrl: NavController,
     public loadCtrl:LoadingController,
  public alertCtrl:AlertController,private authPro:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignUp():void{
    this.navCtrl.push('SignUpPage')
  }

  signIn(){
    if(!this.email && !this.password){
  //console.log('enter email and password')
    }
    else{
      this.authPro.signInUser(this.email,this.password).then(authData=>{
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
    
    forgetPassword(){
      this.navCtrl.push('ResetPage')
    }


  
}