import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@primeng/prime-ng.module';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { VentasFormComponent } from './ventas-form/ventas-form.component';

@NgModule({
  declarations: [VentasListComponent, VentasFormComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class VentasModule {}
