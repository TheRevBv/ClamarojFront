import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule { }
