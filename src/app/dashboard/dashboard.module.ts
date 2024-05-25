import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TabsPrincipalComponent } from './pages/tabs-principal/tabs-principal.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './pages/home/home.component';
import { MenuUsuarioComponent } from './pages/menu-usuario/menu-usuario.component';
import { RegistroEgresoComponent } from './pages/registro-egreso/registro-egreso.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { InformacionPersonalComponent } from './pages/informacion-personal/informacion-personal.component';
import { RegistroAlertaComponent } from './pages/registro-alerta/registro-alerta.component';
import { MisAlertasComponent } from './pages/mis-alertas/mis-alertas.component';
import { ReporteMensualComponent } from './pages/reporte-mensual/reporte-mensual.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TabsPrincipalComponent,
    HomeComponent,
    MenuUsuarioComponent,
    RegistroEgresoComponent,
    MiPerfilComponent,
    InformacionPersonalComponent,
    RegistroAlertaComponent,
    MisAlertasComponent,
    ReporteMensualComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
