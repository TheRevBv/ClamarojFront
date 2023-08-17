import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { MenuComponent } from '@shared/menu/menu.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { MenuUserComponent } from '@shared/menu-user/menu-user.component';
import { TopBarComponent } from '@shared/top-bar/top-bar.component';

@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent,
    MenuUserComponent,
    TopBarComponent,
  ],
  imports: [CommonModule, PrimeNgModule],
  exports: [
    MenuComponent,
    SidebarComponent,
    MenuUserComponent,
    TopBarComponent,
  ],
})
export class SharedModule {}
