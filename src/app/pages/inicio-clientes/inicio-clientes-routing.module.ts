import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioClientesComponent } from './inicio-clientes.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../modules/home/home.module').then((m) => m.HomeModule),
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
