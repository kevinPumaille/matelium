import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReporteMensualService } from '../../services/reporte-mensual.service';
import { RegistroAlertaService } from '../../services/registro-alerta.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  private reporteMensualService = inject( ReporteMensualService );
  private registroAlertaService = inject( RegistroAlertaService );

  numAlertas: number = 0;
  name: string = "Manuel";
  chart: Chart;
  miSuscripcion;

  constructor() { }

  ngOnInit() {
    this.createBarChart();
    this.registroAlertaService.obtenerAlertasAll().subscribe( data => this.numAlertas = data.length);
  }

  

  createBarChart(): void {
    // this.chart.destroy();
    this.reporteMensualService.crearReportePrincipal().subscribe( data => {
      console.log( data );
      // Obtenemos las claves del objeto
      const claves = Object.keys(data);

      // Obtenemos los valores del objeto
      const valores = Object.values(data);
      this.grafico(claves, valores);
    })

    
  }

  grafico(claves, valores){
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
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
