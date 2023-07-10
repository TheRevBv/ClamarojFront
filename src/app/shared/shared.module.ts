import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { MenuComponent } from '@shared/menu/menu.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    MenuComponent,
    SidebarComponent
  ]
})

export class SharedModule { }
