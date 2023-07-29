import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { PrimeNgModule } from '@primeng/prime-ng.module';

@NgModule({
  declarations: [UsuariosListComponent],
  imports: [CommonModule, UsuariosRoutingModule, PrimeNgModule],
})
export class UsuariosModule {}
