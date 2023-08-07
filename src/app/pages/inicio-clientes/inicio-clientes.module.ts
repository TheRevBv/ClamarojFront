import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioClientesRoutingModule } from './inicio-clientes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { InicioClientesComponent } from '@pages/inicio-clientes/inicio-clientes.component';

@NgModule({
  declarations: [InicioClientesComponent],
  imports: [CommonModule, InicioClientesRoutingModule, SharedModule],
})
export class InicioClientesModule {}
