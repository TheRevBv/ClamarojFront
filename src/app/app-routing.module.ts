import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    title: 'Inicio Clamaroj',
    loadChildren: () =>
      import('@modules/inicio-clientes/inicio-clientes.module').then(
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
