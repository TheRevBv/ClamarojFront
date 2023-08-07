import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecetasListComponent } from './recetas-list/recetas-list.component';
import { RecetasFormComponent } from './recetas-form/recetas-form.component';

const routes: Routes = [
  {
    path: '',
    component: RecetasListComponent,
  },
  {
    path: 'agregar',
    component: RecetasFormComponent,
  },
  {
    path: 'editar/:id',
    component: RecetasFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasRoutingModule {}
