import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalProveedoresComponent } from './portal-proveedores.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import {
  nonAdminGuard,
  nonAdminChildGuard,
} from '@guards/non-auth-admin.guard';
import { AuthProveedoresGuard } from '@guards/auth-proveedores.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalProveedoresComponent,
    canActivate: [AuthProveedoresGuard],
    canActivateChild: [AuthProveedoresGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [nonAdminGuard],
    // canActivateChild: [nonAdminChildGuard],
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [nonAdminGuard],
    // canActivateChild: [nonAdminChildGuard],
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
export class PortalProveedoresRoutingModule {}
