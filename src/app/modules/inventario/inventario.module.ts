import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { InventarioRoutingModule } from './inventario-routing.module';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { MateriaPrimaListComponent } from './materia-prima-list/materia-prima-list.component';
import { MateriaPrimaFormComponent } from './materia-prima-form/materia-prima-form.component';


@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoFormComponent,
    MateriaPrimaListComponent,
    MateriaPrimaFormComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventarioModule { }
