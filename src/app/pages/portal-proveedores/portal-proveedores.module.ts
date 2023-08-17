import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '@primeng/prime-ng.module';
import { SharedModule } from '@shared/shared.module';

import { PortalProveedoresRoutingModule } from './portal-proveedores-routing.module';
import { PortalProveedoresComponent } from '@pages/portal-proveedores/portal-proveedores.component';
import { PortalFormComponent } from './portal-form/portal-form.component';
import { PortalListComponent } from './portal-list/portal-list.component';

@NgModule({
  declarations: [PortalProveedoresComponent, PortalFormComponent, PortalListComponent],
  imports: [
    CommonModule,
    PortalProveedoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ],
})
export class PortalProveedoresModule {}
