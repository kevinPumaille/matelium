import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { ReporteMensualService } from '../../services/reporte-mensual.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrls: ['./reporte-mensual.component.scss'],
})
export class ReporteMensualComponent  implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  name: string;

  dataGrafico;

  categorias = [];
  claves = [];
  valores = [];
  prueba;

  private reporteMensualService = inject( ReporteMensualService );
  private formBuilder = inject( FormBuilder );
  loginForm: FormGroup;
  
  constructor() { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      mes: ['', [Validators.required, Validators.email]],
      anio: ['', Validators.required]
    });
  }

  cancel() {

    this.grafico(Object.keys(this.dataGrafico),Object.values(this.dataGrafico));
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

   onSubmit() {
    this.reporteMensualService.crearReporte(this.loginForm.value.mes).subscribe( data => {
      console.log(Object.keys(data))
      console.log(Object.values(data))
      this.dataGrafico = data;
      this.categorias = Object.entries(data);
      console.log(Object.entries(data))
      // setTimeout( ()=> {
        this.grafico(Object.keys(data),Object.values(data));
        
      // }, 3000)
    });

    console.log(this.loginForm.value)

    
    
   }

   grafico(claves,valores){
    const ctx = document.getElementById('barcharta') as HTMLCanvasElement;
    // this.prueba = ctx;
    // console.log(ctx);
    const myChart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (puedes cambiarlo a 'horizontalBar' si prefieres barras horizontales)
      data: {
        labels: claves, // Etiquetas para cada barra
        datasets: [
          {
            label: 'Egresos', // Etiqueta para la leyenda
            data: valores, // Valores de las barras
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
            borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
            borderWidth: 1, // Ancho del borde
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Comenzar el eje Y desde cero
          },
        },
      },
    });
  }

   

}
