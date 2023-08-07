import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioClientesComponent } from './inicio-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: InicioClientesComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioClientesRoutingModule {}
