import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { UnidadMedidaRoutingModule } from './unidad-medida-routing.module';
import { UnidadMedidaListComponent } from './unidad-medida-list/unidad-medida-list.component';
import { UnidadMedidaFormComponent } from './unidad-medida-form/unidad-medida-form.component';

@NgModule({
  declarations: [UnidadMedidaListComponent, UnidadMedidaFormComponent],
  imports: [
    CommonModule,
    UnidadMedidaRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UnidadMedidaModule {}
