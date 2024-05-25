import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroAlertaService } from '../../services/registro-alerta.service';

@Component({
  selector: 'app-registro-alerta',
  templateUrl: './registro-alerta.component.html',
  styleUrls: ['./registro-alerta.component.scss'],
})
export class RegistroAlertaComponent  implements OnInit {

  private registroAlertaService = inject( RegistroAlertaService );
  private formBuilder = inject( FormBuilder );
  loginForm: FormGroup;

  toast: boolean = true;

  categoriasAll = [];

  constructor() { }

  ngOnInit() {

    this.registroAlertaService.obtenerAlertas().subscribe( data => {
      const categorias = ['ropa','transporte','restaurante','comida de casa','otros'];
      const valoresExcluidos = categorias.filter(valor => !data.includes(valor));
      this.categoriasAll = valoresExcluidos;
      console.log( valoresExcluidos )
    });

    this.loginForm = this.formBuilder.group({
      tipoAlerta: ['', [Validators.required]],
      categoria: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }


  onSubmit(){
    console.log(this.loginForm.value)
    if( this.loginForm.valid){
      this.registroAlertaService.agregarAlerta(this.loginForm.value)
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 500)
      this.loginForm.reset();
    }
  }
}
