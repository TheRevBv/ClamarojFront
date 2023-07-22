import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesListComponent,
    // canActivate: [],
    children: [
      {
        path: 'agregar',
        component: ClientesAddComponent,
        // canActivate: [],
      },
    /*
    {
        path: 'editar/:id',
        // component: ClientesFormComponent,
        // canActivate: [],
      },
      {
        path: 'eliminar/:id',
        // component: ClientesFormComponent,
        // canActivate: [],
      },
      */
    ],
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
export class ClientesRoutingModule {}
