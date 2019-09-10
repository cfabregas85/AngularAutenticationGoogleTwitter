import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Message } from '../interface/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[]=[];
  public User: any={};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

        this.afAuth.authState.subscribe(user=>{
          console.log('State User', user);
          if (!user) {
            return;
          }

          this.User.name = user.displayName;
          this.User.uid = user.uid;

        })
   }
    
     login( provider : string) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    logout() {
      this.afAuth.auth.signOut();
    }


   GetMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', 
                           ref=> ref.orderBy('date', 'desc').limit(10));

   return this.itemsCollection.valueChanges().pipe(map((messages:Message[])=>{
                console.log(messages);
                this.chats = [];
                for(let message of messages){
                  this.chats.unshift(message);
                }
              }))
  }

  AddMessage( text:string){
     
    let message:Message={
        name:'Carlos',
        message:text,
        date: new Date().getTime()
      }

     return this.itemsCollection.add(message);
  }
}
