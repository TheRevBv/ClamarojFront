import { NgModule } from '@angular/core';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { MenuItem } from 'primeng/api';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    CheckboxModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    PanelMenuModule,
    SidebarModule,
    ScrollTopModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    // ScrollPanelModule,
  ],
})
export class PrimeNgModule {}
