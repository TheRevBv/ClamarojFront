import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadMedidaListComponent } from './unidad-medida-list/unidad-medida-list.component';
import { UnidadMedidaFormComponent } from './unidad-medida-form/unidad-medida-form.component';

const routes: Routes = [
  {
    path: '',
    component: UnidadMedidaListComponent,
  },
  {
    path: 'agregar',
    component: UnidadMedidaFormComponent,
  },
  {
    path: 'editar/:id',
    component: UnidadMedidaFormComponent,
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
export class UnidadMedidaRoutingModule {}
