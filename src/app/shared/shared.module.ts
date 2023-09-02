import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '@primeng/prime-ng.module';

import { MenuComponent } from '@shared/menu/menu.component';
import { MenuStoreComponent } from '@shared/menu-store/menu-store.component';
import { MenuUserComponent } from '@shared/menu-user/menu-user.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { TopBarComponent } from '@shared/top-bar/top-bar.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuStoreComponent,
    MenuUserComponent,
    SidebarComponent,
    TopBarComponent,
  ],
  imports: [CommonModule, PrimeNgModule],
  exports: [
    MenuComponent,
    MenuStoreComponent,
    MenuUserComponent,
    SidebarComponent,
    TopBarComponent,
  ],
})
export class SharedModule {}
