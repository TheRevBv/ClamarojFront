import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { ComprasFormComponent } from './compras-form/compras-form.component';


@NgModule({
  declarations: [
    ComprasListComponent,
    ComprasFormComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
