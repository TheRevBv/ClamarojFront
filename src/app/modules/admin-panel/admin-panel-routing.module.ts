import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component : AdminPanelComponent,
    // children: [
    //   {
    //     path: 'inicio',
    //     // loadChildren: () => import('@modules/inicio-clientes/inicio-clientes.module').then(m => m.InicioClientesModule)
    // },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
