import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { VentasFormComponent } from './ventas-form/ventas-form.component';

const routes: Routes = [
  {
    path: '',
    component: VentasListComponent,
    children: [
      {
        path: 'detalle',
        component: VentasFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
