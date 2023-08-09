import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { MateriasPrimasRoutingModule } from './materias-primas-routing.module';
import { MateriaPrimaListComponent } from './materia-prima-list/materia-prima-list.component';
import { MateriaPrimaFormComponent } from './materia-prima-form/materia-prima-form.component';


@NgModule({
  declarations: [MateriaPrimaListComponent, MateriaPrimaFormComponent],
  imports: [
    CommonModule,
    MateriasPrimasRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MateriasPrimasModule {}