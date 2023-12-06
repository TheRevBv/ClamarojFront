import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthClientesGuard } from '@guards/auth-clientes.guard';

import { AboutComponent } from '@modules/home/about/about.component';
import { CheckoutComponent } from '@modules/home/shopping-cart/checkout/checkout.component';
import { ContactComponent } from '@modules/home/contact/contact.component';
import { InicioComponent } from '@modules/home/inicio/inicio.component';
import { ProdetComponent } from '@modules/home/products/prodet/prodet.component';
import { ProductsComponent } from '@modules/home/products/products.component';
import { ShoppingCartComponent } from '@modules/home/shopping-cart/shopping-cart.component';
import { SinginComponent } from '@modules/home/singin/singin.component';
import { SingupComponent } from '@modules/home/singup/singup.component';
import { ValidateComponent } from '@modules/home/shopping-cart/validate/validate.component';
// import { NonAuthGuard } from "@guards/non-auth.guard";
// import { AuthGuard } from "@guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'products',
    canActivateChild: [AuthClientesGuard],
    children: [
      { path: '', component: ProductsComponent },
      { path: 'show/:id', component: ProdetComponent },
    ],
  },
  {
    path: 'shopping-cart',
    canActivate: [AuthClientesGuard],
    canActivateChild: [AuthClientesGuard],
    children: [
      { path: '', component: ShoppingCartComponent },
      { path: 'pago/:id', component: CheckoutComponent },
      { path: 'validate', component: ValidateComponent },
    ],
  },
  { path: 'singin', component: SinginComponent },
  { path: 'singup', component: SingupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
