import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalProveedoresComponent } from './portal-proveedores.component';

const routes: Routes = [
  {
    path: '',
    component: PortalProveedoresComponent,
  },
  // {
  //   path: 'login',

  // },
  // {
  //   path: 'registro',
  // },
  // {
  //   path: 'recuperar-contrasena',
  // },
  // {
  //   path: 'cambiar-contrasena',
  // },
  // {
  //   path: 'dashboard',
  // },
  // {
  //   path: 'perfil',
  // },
  // {
  //   path: 'facturas',
  // },
  // {
  //   path: 'facturas/:id',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalProveedoresRoutingModule {}
