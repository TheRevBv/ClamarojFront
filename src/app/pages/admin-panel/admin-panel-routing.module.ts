import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
// import { adminChildGuard, adminGuard } from '@guards/auth-admin.guard';
import {
  nonAdminGuard,
  nonAdminChildGuard,
} from '@guards/non-auth-admin.guard';
import { LoginComponent } from './login/login.component';
import { AuthAdminGuard } from '@guards/auth-admin.guard';
import { RegistroComponent } from './registro/registro.component';
// import { NonAuthGuard } from '@guards/non-auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    // // canActivate: [adminGuard],
    // // canActivateChild: [adminChildGuard],
    // canActivate: [AuthAdminGuard],
    // canActivateChild: [AuthAdminGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('@modules/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('@modules/inventario/inventario.module').then(
            (m) => m.InventarioModule
          ),
      },
      {
        path: 'produccion',
        loadChildren: () =>
          import('@modules/produccion/produccion.module').then(
            (m) => m.ProduccionModule
          ),
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('@modules/pedidos/pedidos.module').then(
            (m) => m.PedidosModule
          ),
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('@modules/ventas/ventas.module').then((m) => m.VentasModule),
      },
      {
        path: 'compras',
        loadChildren: () =>
          import('@modules/compras/compras.module').then(
            (m) => m.ComprasModule
          ),
      },
      {
        path: 'proveedores',
        loadChildren: () =>
          import('@modules/proveedores/proveedores.module').then(
            (m) => m.ProveedoresModule
          ),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('@modules/clientes/clientes.module').then(
            (m) => m.ClientesModule
          ),
      },
      // {
      //   path: 'reportes',
      //   // loadChildren: () => import('@modules/reportes/reportes.module').then(m => m.ReportesModule),
      // },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('@modules/configuracion/configuracion.module').then(
            (m) => m.ConfiguracionModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [nonAdminGuard],
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [nonAdminGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
