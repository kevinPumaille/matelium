import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { RegistroEgreso } from '../interfaces/registroEgreso.interface';
import { Observable, map } from 'rxjs';
import { ReporteMensualService } from './reporte-mensual.service';

@Injectable({
  providedIn: 'root'
})
export class RergistroEgresoService {

  private fireStore = inject( Firestore );

  constructor() { }

  agregarEgreso( egreso: RegistroEgreso){
    const placeRef = collection(this.fireStore, 'egresos');
    return addDoc(placeRef, egreso);
  }

  obtenerEgresos(): Observable<RegistroEgreso[]>{
    const placeRef = collection(this.fireStore, 'egresos');

    return collectionData(placeRef, {idField: 'id'}) as Observable<RegistroEgreso[]>;
  }

  obtenerEgresosPorCategoria(categoriaBuscar: string): Observable<any>{
    return this.obtenerEgresos()
    .pipe(
      map( egre => {

        const sumaMontosPorCategoria = {};
        const date = new Date();
        const month = date.getMonth() + 1;
        const listaDeDiasMesActual = egre.filter( e => e.mes === month)

        listaDeDiasMesActual.forEach(transaccion => {
          const categoria = transaccion.categoria;
          const monto = transaccion.monto;
      
          // Si la categoría ya existe en el objeto, sumar el monto
          // Si no existe, inicializarla con el monto actual
          if (categoria in sumaMontosPorCategoria) {
              sumaMontosPorCategoria[categoria] += monto;
          } else {
              sumaMontosPorCategoria[categoria] = monto;
          }
      });

        const categoria = sumaMontosPorCategoria[categoriaBuscar];

        return categoria;
      }),
    );
  }
}
