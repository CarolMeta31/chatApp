
import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  resetPassword(email:string):Promise<any>{
    return firebase.auth().sendPasswordResetEmail(email);

  }

  signInUser(email:string,password:string):Promise<any>{
 return firebase.auth().signInWithEmailAndPassword(email,password);


  }
  signOut():Promise<any>{
    const userId:string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

  signUpUser(email:string,password:string):Promise <any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(newUserCreds=>{
    firebase.database().ref(`/userProfile/${newUserCreds.user.uid}/email`).set(email);
    
    }).catch(error=>{
      throw new error (error);
    })

   
    
  }
}
