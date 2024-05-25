import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { RegistroAlerta } from '../interfaces/registroAlerta.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroAlertaService {

  private fireStore = inject( Firestore );

  constructor() { }

  agregarAlerta( registroAlerta: RegistroAlerta){
    const placeRef = collection(this.fireStore, 'alertas');
    return addDoc(placeRef, registroAlerta);
  }

  obtenerAlertas(): Observable<any[]>{
    const placeRef = collection(this.fireStore, 'alertas');

    const response =  collectionData(placeRef, {idField: 'id'});

    return response
      .pipe(
        map( data => {
          const categorias = data.map( alerta => alerta['categoria'])

          return categorias;
        })
      )
  }

  obtenerMontoAlertaPorCategoria(categoria: string): Observable<RegistroAlerta>{
    const placeRef = collection(this.fireStore, 'alertas');

    const response =  collectionData(placeRef, {idField: 'id'});

    return response
      .pipe(
        map( data => {
          const categorias = data.find( alerta => alerta['categoria'] == categoria)

          return categorias as RegistroAlerta || null;
        })
      )
  }

  obtenerAlertasAll(): Observable<RegistroAlerta[]>{
    const placeRef = collection(this.fireStore, 'alertas');

    const response =  collectionData(placeRef, {idField: 'id'});

    return response as Observable<RegistroAlerta[]>;
  }

  async eliminarAlerta(id: string){
    await deleteDoc(doc(this.fireStore, "alertas", id));
  }
}
