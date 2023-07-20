import { NgModule } from '@angular/core';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { MenuItem } from 'primeng/api';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    MenuModule,
    MenubarModule,
    PanelMenuModule,
    SidebarModule,
    ScrollTopModule,
    TableModule,
    // ScrollPanelModule,
  ],
})
export class PrimeNgModule {}
