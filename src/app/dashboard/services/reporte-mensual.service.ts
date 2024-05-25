import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { RergistroEgresoService } from './rergistro-egreso.service';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteMensualService {

  private registroEgreso = inject( RergistroEgresoService );
  private fireStore = inject( Firestore );

  constructor() { }

  crearReporte(mes: number): Observable<any>{
    return this.registroEgreso.obtenerEgresos()
    .pipe(
      map( data => {

        const sumaMontosPorCategoria = {};
        const egresosFilter = data.filter( egres => egres.mes == mes);

        egresosFilter.forEach(transaccion => {
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

        console.log( egresosFilter );
        console.log( sumaMontosPorCategoria );
  
        return sumaMontosPorCategoria;
      })
    )

  }

  crearReportePrincipal(): Observable<any>{

    return this.registroEgreso.obtenerEgresos()
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

        return sumaMontosPorCategoria;
      }),
    );
  }
}
