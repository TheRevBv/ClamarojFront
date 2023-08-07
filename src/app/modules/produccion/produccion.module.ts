import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { ProduccionRoutingModule } from './produccion-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProduccionModule {}
