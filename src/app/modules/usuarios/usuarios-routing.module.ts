import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from '@modules/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from '@modules/usuarios/usuarios-form/usuarios-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosListComponent,
    // canActivate: [],
  },
  {
    path: 'agregar',
    component: UsuariosFormComponent,
    // canActivate: [],
  },
  {
    path: 'editar/:id',
    component: UsuariosFormComponent,
    // canActivate: [],
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
