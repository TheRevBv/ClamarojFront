import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [AdminPanelComponent, LoginComponent, RegistroComponent],
  imports: [CommonModule, SharedModule, PrimeNgModule, AdminPanelRoutingModule],
  exports: [AdminPanelComponent, LoginComponent],
})
export class AdminPanelModule {}
