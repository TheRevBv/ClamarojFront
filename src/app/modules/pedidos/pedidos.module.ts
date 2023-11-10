import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@primeng/prime-ng.module';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';

@NgModule({
  declarations: [PedidosListComponent, PedidosFormComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class PedidosModule {}
