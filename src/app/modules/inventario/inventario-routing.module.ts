import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { MateriaPrimaFormComponent } from './materia-prima-form/materia-prima-form.component';
import { MateriaPrimaListComponent } from './materia-prima-list/materia-prima-list.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductoListComponent,
  },
  {
    path: 'agregar',
    component: ProductoFormComponent,
  },
  {
    path: 'editar/:id',
    component: ProductoFormComponent,
  },
  // {
  //   path: 'materia-prima',
  //     component: MateriaPrimaListComponent,
  //   children:[
  //     {
  //       path: 'agregar',
  //       component: MateriaPrimaFormComponent,
  //     },
  //     {
  //       path: 'editar/:id',
  //       component: MateriaPrimaFormComponent,
  //     },
  //   ]
  // },
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
