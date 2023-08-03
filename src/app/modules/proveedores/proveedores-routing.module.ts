import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedorListComponent,
  },// children: [
  {
    path: 'agregar',
    component: CreateComponent,
  },
  {
    path: 'editar/:id',
    component: EditComponent,
  },
  // ]},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProveedoresRoutingModule { }
