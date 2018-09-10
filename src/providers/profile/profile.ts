
import { Injectable } from '@angular/core';
import firebase, {User} from 'firebase/app';
import 'firebase/database';

@Injectable()
export class ProfileProvider {

  userProfile:firebase.database.Reference;
currentUser:User;

  constructor() {
   
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }
 getUserProfile():firebase.database.Reference{
  return this.userProfile;
}

updateName(firstName:string,lastName:string):Promise<any>{
  return this.userProfile.update({firstName,lastName});
  
}
updateDOB(birthDate:string):Promise<any>{
  return this.userProfile.update({birthDate});
  
}
updatePassword(newPassword:string,oldPassword:string):Promise<any>{
  
  const credentials:firebase.auth.AuthCredential=firebase.auth.EmailAuthProvider
  .credential(this.currentUser.email,oldPassword);
return this.currentUser.reauthenticateWithCredential(credentials)
.then(user=>{
  this.currentUser.updatePassword(newPassword).then(user=>{
    console.log('password has been changed')
  })
   
  }).catch(error=>{
    console.log(error);
  })
  
}
}
