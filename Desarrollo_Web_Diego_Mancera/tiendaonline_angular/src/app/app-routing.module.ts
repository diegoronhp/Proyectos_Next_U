import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PaginaPrincipalComponent  } from './pagina-principal/pagina-principal.component';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionComponent
  },
  {
    path: 'principal',
    component: PaginaPrincipalComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
