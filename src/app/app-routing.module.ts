import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inicio', loadChildren: () => import('@modules/inicio-clientes/inicio-clientes.module').then(m => m.InicioClientesModule) },
  { path: 'admin', loadChildren: () => import('@modules/admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
