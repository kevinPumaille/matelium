import { Component, OnInit, inject } from '@angular/core';
import { RegistroAlertaService } from '../../services/registro-alerta.service';
import { RegistroAlerta } from '../../interfaces/registroAlerta.interface';

@Component({
  selector: 'app-mis-alertas',
  templateUrl: './mis-alertas.component.html',
  styleUrls: ['./mis-alertas.component.scss'],
})
export class MisAlertasComponent implements OnInit {


  private registroAlertasService = inject(RegistroAlertaService);
  alertasAll: RegistroAlerta[];

  constructor() { }

  ngOnInit() {
    this.registroAlertasService.obtenerAlertasAll().subscribe( data => {
      console.log( data );
      this.alertasAll = data;
    })

  }

  handleChange(e) {
    console.log('ionChange fired with value: ' + e.detail.value);
  }

  eliminarAlerta(arg0: string) {
    console.log(arg0)
    this.registroAlertasService.eliminarAlerta(arg0);
    // this.registroAlertasService.obtenerAlertasAll().subscribe();
  }
}
