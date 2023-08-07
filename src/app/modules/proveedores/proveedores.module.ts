import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';

@NgModule({
  declarations: [ProveedoresListComponent, ProveedoresFormComponent],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProveedoresModule {}
