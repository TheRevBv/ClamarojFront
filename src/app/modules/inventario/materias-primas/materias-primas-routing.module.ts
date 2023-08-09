import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriaPrimaListComponent } from './materia-prima-list/materia-prima-list.component';
import { MateriaPrimaFormComponent } from './materia-prima-form/materia-prima-form.component';

const routes: Routes = [
  {
    path: '',
    component: MateriaPrimaListComponent,
  },
  {
    path: 'agregar',
    component: MateriaPrimaFormComponent,
  },
  {
    path: 'editar/:id',
    component: MateriaPrimaFormComponent,
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
export class MateriasPrimasRoutingModule {}