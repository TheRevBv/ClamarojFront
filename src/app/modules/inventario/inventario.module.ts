import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { InventarioRoutingModule } from './inventario-routing.module';


@NgModule({
  declarations: [
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
