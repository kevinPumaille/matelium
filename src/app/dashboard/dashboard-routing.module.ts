import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroEgresoComponent } from './pages/registro-egreso/registro-egreso.component';
import { MenuUsuarioComponent } from './pages/menu-usuario/menu-usuario.component';
import { TabsPrincipalComponent } from './pages/tabs-principal/tabs-principal.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { InformacionPersonalComponent } from './pages/informacion-personal/informacion-personal.component';
import { RegistroAlertaComponent } from './pages/registro-alerta/registro-alerta.component';
import { MisAlertasComponent } from './pages/mis-alertas/mis-alertas.component';
import { ReporteMensualComponent } from './pages/reporte-mensual/reporte-mensual.component';

const routes: Routes = [
  
  {
    path: 'tabsprincipal',
    component: TabsPrincipalComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'registroegreso',
        component: RegistroEgresoComponent
      },
      {
        path: 'menuusuario',
        component: MenuUsuarioComponent,
      },
      {
        path: 'miperfil',
        component: MiPerfilComponent
      },
      {
        path: 'informacionpersonal',
        component: InformacionPersonalComponent
      },
      {
        path: 'registroalerta',
        component: RegistroAlertaComponent
      },
      {
        path: 'misalertas',
        component: MisAlertasComponent
      },
      {
        path: 'reportemensual',
        component: ReporteMensualComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ],
    
  },
  {
    path:'**',
    redirectTo:'tabsprincipal'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
