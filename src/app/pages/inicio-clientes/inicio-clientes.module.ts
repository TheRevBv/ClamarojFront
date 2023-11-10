import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';
import { SharedModule } from '@shared/shared.module';

import { InicioClientesRoutingModule } from './inicio-clientes-routing.module';
import { InicioClientesComponent } from './inicio-clientes.component';
@NgModule({
  declarations: [InicioClientesComponent],
  imports: [
    CommonModule,
    InicioClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ],
})
export class InicioClientesModule {}
