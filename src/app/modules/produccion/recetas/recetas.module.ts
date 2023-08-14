import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { RecetasRoutingModule } from './recetas-routing.module';
import { RecetasListComponent } from './recetas-list/recetas-list.component';
import { RecetasFormComponent } from './recetas-form/recetas-form.component';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [RecetasListComponent, RecetasFormComponent],
  imports: [
    CommonModule,
    RecetasRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class RecetasModule {}
