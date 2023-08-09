import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasFormComponent } from './compras-form/compras-form.component';
import { ComprasListComponent } from './compras-list/compras-list.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasListComponent,
    children: [
      {
        path: 'detalle',
        component: ComprasFormComponent,
      },
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
export class ComprasRoutingModule {}
