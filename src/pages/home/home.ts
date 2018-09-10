import { ChatProvider } from './../../providers/chat/chat';
import firebase from 'firebase/app';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component,ViewChild } from '@angular/core';
import { NavController,Content,NavParams } from 'ionic-angular';
import 'firebase/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userProfile:any;
   chatRef:firebase.database.ThenableReference;

  @ViewChild(Content) content:Content;
  data:any={

    type:'',
    message:''
  }
  email:string;
  chats=[];
 roomKey:string;
 offStatus:boolean=false;
   firebaseRef: firebase.database.Reference;
   joinData={};

  constructor(public navCtrl: NavController,
    private authPro:AuthProvider,
    private proProvider:ProfileProvider,private chat:ChatProvider,private navParams:NavParams) {
 
      this.roomKey=this.navParams.get('key') as string
      this.userProfile=this.navParams.get('userProfile');
   this.data.type='message';
   this.chatRef = firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push();
   console.log(this.userProfile)
   let joinData = {
     type:'join',
     user:this.userProfile.firstName,
     message:this.userProfile.firstName + 'has joined this chat room',
     sendDate:Date()

   }
   this.chatRef.set(joinData);

   this.data.message='';

   firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).on('value',response=>{
     this.chats=[];
     this.chats=snapShotToArray(response);
     
     setTimeout(() =>{
      if (this.offStatus===false){
        this.content.scrollToBottom(300);
      }
  
    },1000)//when data is not sent out at a specific time

   });
 

  }

  
  ionViewDidLoad() {
    this.proProvider.getUserProfile().on('value', userProfileSnapShot => {
      this.userProfile = userProfileSnapShot.val();
      this.userProfile.firstName = userProfileSnapShot.val().firstName;
      // this.userProfile.email = userProfileSnapShot.val().email;
    
    })
  }
  sendMessage(){
    firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`)
    .push().set({
      type:this.data.type,
      user:this.userProfile.firstName,
      message:this.data.message,
      sendDate:Date()
    });
  }
  logOut(){
    this.authPro.signOut().then(()=>{
      this.navCtrl.setRoot('LoginPage');
    })
  }
  goToProfile() {

    this.navCtrl.push('ProfilePage')
  }
  goToRooms() {
    this.navCtrl.push('RoomsPage')
  }
  
  exitChat(){
   let exitData=firebase.database().ref(`/userProfile/chatRooms/${this.roomKey}/chats`).push();

   exitData.set({
     type:'exit',
     user:this.userProfile.firstName,
      message:this.userProfile.firstName+ 'has exited the room',
      sendDate:Date()
   });
   this.offStatus=true;
   this.navCtrl.setRoot('RoomsPage')
  }
  getChats9(){
    return this.chat
  }
}

export const snapShotToArray =snapShot =>{
  let returnArr=[];
  snapShot.forEach(childSnapshot =>{
    let item =childSnapshot.val();
    returnArr.push(item);
  });
  console.log("array", returnArr)
  return returnArr;
}
