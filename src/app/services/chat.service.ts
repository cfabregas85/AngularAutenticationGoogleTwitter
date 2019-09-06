import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Message } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: any[]=[];

  constructor(private afs: AngularFirestore) { }

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
