import { NgModule } from '@angular/core';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { MenuItem } from 'primeng/api';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    ImageModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    FileUploadModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    PaginatorModule,
    PanelMenuModule,
    PasswordModule,
    SidebarModule,
    ScrollTopModule,
    TableModule,
    ToastModule,
    // ScrollPanelModule,
  ],
})
export class PrimeNgModule {}
