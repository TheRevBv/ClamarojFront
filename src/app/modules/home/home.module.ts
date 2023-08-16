import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
//import {SharedModule} from "@shared/shared.module"; --Modulo para compartir componentes
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from '@modules/home/about/about.component';
import { ContactComponent } from '@modules/home/contact/contact.component';
import { HomeComponent } from '@modules/home/home.component';
import { MenuStoreComponent } from '@modules/home/menu-store/menu-store.component';
import { ProductsComponent } from '@modules/home/products/products.component';
import { ShoppingCartComponent } from '@modules/home/shopping-cart/shopping-cart.component';
import { ProdetComponent } from '@modules/home/products/prodet/prodet.component';

// import { SinginComponent } from './singin/singin.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
// import { CarritoComponent } from './products/carrito/carrito.component';
// import { SingupComponent } from './singup/singup.component';
// import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { ValidateComponent } from './shopping-cart/validate/validate.component';
// import { MainModule } from "@modules/main/main.module";

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    MenuStoreComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProdetComponent,
    // SinginComponent,
    // SingupComponent,
    InicioComponent,
    FooterComponent,
    // CarritoComponent,
    // CheckoutComponent,
    ValidateComponent,
  ],
  exports: [InicioComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgOptimizedImage,
    // MainModule
  ],
})
export class HomeModule {}
