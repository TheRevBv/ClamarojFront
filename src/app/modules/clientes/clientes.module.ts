import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@app/primeng/prime-ng.module';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';

@NgModule({
  declarations: [ClientesListComponent, ClientesFormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ClientesListComponent],
})
export class ClientesModule {}
