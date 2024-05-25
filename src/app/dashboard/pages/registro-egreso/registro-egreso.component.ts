import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RergistroEgresoService } from '../../services/rergistro-egreso.service';
import { RegistroEgreso } from '../../interfaces/registroEgreso.interface';
import { RegistroAlertaService } from '../../services/registro-alerta.service';
import { pipe, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-registro-egreso',
  templateUrl: './registro-egreso.component.html',
  styleUrls: ['./registro-egreso.component.scss'],
})
export class RegistroEgresoComponent implements OnInit {

  private registroAlertaService = inject(RegistroAlertaService);
  private registroEgresoService = inject(RergistroEgresoService);
  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  mensajeAviso: string;
  aviso: boolean = false;
  toast: boolean = true;

  montoTotal: any;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Agregar',
      role: 'confirm',
      handler: async () => {
        this.toast = true;
        this.agregarEgresoFun();

        setTimeout(() => {
          this.toast = false;
        }, 500)
      },
    },
  ];

  constructor() { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      categoria: ['', [Validators.required, Validators.email]],
      monto: ['', Validators.required]
    });
  }

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    this.aviso = false;
  }

  onSubmit() {

    this.registroEgresoService.obtenerEgresosPorCategoria(this.loginForm.value.categoria)
    .pipe(
      switchMap( montoTot => {
        this.montoTotal = montoTot;
        return this.registroAlertaService.obtenerMontoAlertaPorCategoria(this.loginForm.value.categoria);
      }),
      take(1)
    )
    .subscribe(montoAlerta => {

      if(this.loginForm.value.categoria != '' && this.loginForm.value.monto != ''){
        if (montoAlerta == null) {
          this.agregarEgresoFun();
          console.log('Solo agrega')
          this.toast = true;
    
          setTimeout(() => {
            this.toast = false;
          }, 500)
          
        } else {
          // Sacamos el 90% del monto total de la categoria
          const porcentajeDeMonto = parseInt(montoAlerta.monto) * 0.9;
          // Monto Total mas el monto ingresado
          const montoActual = this.montoTotal || 0 + this.loginForm.value.monto;
    
          console.log('Monto Total: ', this.montoTotal)
          console.log('Monto actual: ', montoActual)
    
    
          // Monto mayor al 90% y menor al 100% del monto limite registrado
          if ((montoActual > porcentajeDeMonto) && (montoActual <= parseInt(montoAlerta.monto))) {
            this.aviso = true;
            this.mensajeAviso = 'El monto supera el 90% del limite previsto para el mes';
          }
    
          if ((montoActual < porcentajeDeMonto)) {
            this.toast = true;
            this.agregarEgresoFun();
            console.log("Bien")
    
            setTimeout(() => {
              this.toast = false;
            }, 500)
          }
    
          if (montoActual > parseInt(montoAlerta.monto)) {
            this.aviso = true;
            this.mensajeAviso = 'Su monto supero el limite previsto para el mes';
          }
    
    
          console.log('Monto de alerta', montoAlerta)
          console.log('Monto del porcentaje', porcentajeDeMonto)
    
        }
    
        
      }
    
    
    });

    
  }

  async agregarEgresoFun(){
    const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();



        const registroEgreso: RegistroEgreso = {
          monto: this.loginForm.value.monto,
          categoria: this.loginForm.value.categoria,
          dia: day,
          mes: month,
          anio: year
        }
        const response = await this.registroEgresoService.agregarEgreso(registroEgreso);
  }
}



