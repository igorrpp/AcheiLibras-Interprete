import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
}


export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentuser: User = null;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentuser = user;
    });
  }

  async signUp({ email, password }) {
    const credential = await this.afAuth.createUserWithEmailAndPassword
      (email, password);

    console.log('result: ', credential);
    const uid = credential.user.uid;

    return this.afs.doc(
      `users/${uid}`).set({
        uid,
        email: credential.user.email,
      })
  }


  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword
      (email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  addChatMessage(msg) {
    return this.afs.collection('messages').add({
      msg,
      from: this.currentuser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getChatMessage() {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users', users);
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>
      }),
      map(messages => {
        for (let m of messages) {
          m.fromName = this.getUsersForMsg(m.from, users);
          m.myMsg = this.currentuser.uid === m.from;
        }
        console.log('all messages: ', messages)

        return messages;
      })
    )
  }

  getUsers() {
    return this.afs.collection('cadastros_de_clientes').valueChanges({ idField: 'uid' }) as Observable<User[]>
  }

  getUsersForMsg(msgFromId, users: User[]): string {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }

    return 'Você';
  }
}
