import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert,AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile:any;
   birthDate:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private proProvider:ProfileProvider,private alertCtrl:AlertController) {
  }

  ionViewCanEnter(){
    this.proProvider.getUserProfile().off();
  }

 ionViewDidLoad(){
  this.proProvider.getUserProfile().on('value',userProfileSnapShot=>{
    this.userProfile=userProfileSnapShot.val();
    this.birthDate=userProfileSnapShot.val().birthDate;
  })
 }



  updateNames(){
const alert:Alert=this.alertCtrl.create({
  message:"your first and last name",
  inputs:[{
    name:'firstName',
    placeholder:'first name',
 value:this.userProfile.firstName
  },{
    name:'lastName',
    placeholder:'last name',
 value:this.userProfile.lastName

  }],
  buttons:[{
    text:'cancel',
  },{
    text:'save',
    handler:data =>{
      this.proProvider.updateName(data.firstName,data.lastName)
    }
  }]
})
alert.present()
  }


  updatePassword(){

    const alert:Alert=this.alertCtrl.create({

      inputs:[{
        name:'oldPassword',
        placeholder:'enter old password',
     type:'password'
      },{
        name:'newPassword',
        placeholder:'enter new password',
        type:'password'
    
      }],
      buttons:[{
        text:'cancel',
      },{
        text:'save',
        handler:data =>{
          this.proProvider.updatePassword(data.newPassword,data.oldPassword)
          .catch(error=>{
            console.log('error message from catch',error.message)
           let newAlert:Alert=this.alertCtrl.create({
             message:error.message
           })
           newAlert.present(); 
          })
        }
      }]
    })
    alert.present()
  }

  updateDOB(birthDate){
    
    this.proProvider.updateDOB(birthDate);
  }

}
