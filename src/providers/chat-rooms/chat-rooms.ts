
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


@Injectable()
export class ChatRoomsProvider {


  private chatRoomListRef:firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.chatRoomListRef=firebase.database().ref(`/userProfile/chatRooms`);
      }
    })

  
    console.log('Hello ChatRoomsProvider Provider');
  }

  createRoom(name:string):firebase.database.ThenableReference{
return this.chatRoomListRef.push({
  chatRoomName:name 
})
 
  }
  getChatRoomsList():firebase.database.Reference{
     return this.chatRoomListRef;
  }

}
