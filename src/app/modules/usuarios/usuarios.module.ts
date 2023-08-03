import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { PrimeNgModule } from '@primeng/prime-ng.module';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

@NgModule({
  declarations: [UsuariosListComponent, UsuariosFormComponent],
  imports: [CommonModule, UsuariosRoutingModule, PrimeNgModule],
})
export class UsuariosModule {}
