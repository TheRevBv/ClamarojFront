import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from '@primeng/prime-ng.module';
import { FooterComponent } from '@shared/footer/footer.component';
import { MenuComponent } from '@shared/menu/menu.component';
import { MenuStoreComponent } from '@shared/menu-store/menu-store.component';
import { MenuUserComponent } from '@shared/menu-user/menu-user.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { TopBarComponent } from '@shared/top-bar/top-bar.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuStoreComponent,
    MenuUserComponent,
    SidebarComponent,
    TopBarComponent,
  ],
  imports: [CommonModule, PrimeNgModule],
  exports: [
    FooterComponent,
    MenuComponent,
    MenuStoreComponent,
    MenuUserComponent,
    SidebarComponent,
    TopBarComponent,
  ],
})
export class SharedModule {}
