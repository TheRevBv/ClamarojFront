import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@primeng/prime-ng.module';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { ComprasFormComponent } from './compras-form/compras-form.component';

@NgModule({
  declarations: [ComprasListComponent, ComprasFormComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class ComprasModule {}
