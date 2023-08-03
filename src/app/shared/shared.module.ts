import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { MenuComponent } from '@shared/menu/menu.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { MenuUserComponent } from './menu-user/menu-user.component';

@NgModule({
  declarations: [MenuComponent, SidebarComponent, MenuUserComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [MenuComponent, SidebarComponent, MenuUserComponent],
})
export class SharedModule {}
