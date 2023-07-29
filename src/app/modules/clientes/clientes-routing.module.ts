import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesListComponent,
    // canActivate: [],
    children: [
      {
        path: 'agregar',
        component: ClientesFormComponent,
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
