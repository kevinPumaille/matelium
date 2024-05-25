import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private fireStore = inject( Firestore );

  constructor() { }

  loginUsuario( login: Login){
    const placeRef = collection(this.fireStore, 'usuarios');
    return addDoc(placeRef, login);
  }
}
