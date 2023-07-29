import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from '@modules/usuarios/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosListComponent,
    children: [
      /* {
        path: 'agregar',
        component: UsuariosFormComponent,
      },
      {
        path: 'editar/:id',
        component: UsuariosFormComponent,
      },
      {
        path: 'eliminar/:id',
        component: UsuariosFormComponent,
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
export class UsuariosRoutingModule {}
