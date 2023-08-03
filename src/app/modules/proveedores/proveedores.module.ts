import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@app/primeng/prime-ng.module';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProveedorListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ProveedorListComponent
  ]
})
export class ProveedoresModule { }
