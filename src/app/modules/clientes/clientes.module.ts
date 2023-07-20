import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@app/primeng/prime-ng.module';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './clientes-list/clientes-list.component';

@NgModule({
  declarations: [ClientesListComponent],
  imports: [CommonModule, ClientesRoutingModule, PrimeNgModule],
  exports: [ClientesListComponent],
})
export class ClientesModule {}
