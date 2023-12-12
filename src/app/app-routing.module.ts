import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    title: 'ClamaROJ',
    loadChildren: () =>
      import('@pages/inicio-clientes/inicio-clientes.module').then(
        (m) => m.InicioClientesModule
      ),
  },
  {
    path: 'admin',
    title: 'Admin Panel',
    loadChildren: () =>
      import('@pages/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
  },
  {
    path: 'portal-proveedores',
    title: 'Portal Proveedores Clamaroj',
    loadChildren: () =>
      import('@pages/portal-proveedores/portal-proveedores.module').then(
        (m) => m.PortalProveedoresModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
