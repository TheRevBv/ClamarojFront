import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { AboutComponent } from '@modules/home/about/about.component';
import { ContactComponent } from '@modules/home/contact/contact.component';
import { ProductsComponent } from '@modules/home/products/products.component';
import { ProdetComponent } from '@modules/home/products/prodet/prodet.component';
import { ShoppingCartComponent } from '@modules/home/shopping-cart/shopping-cart.component';
import { SinginComponent } from './singin/singin.component';
import { InicioComponent } from './inicio/inicio.component';
import { SingupComponent } from './singup/singup.component';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { ValidateComponent } from './shopping-cart/validate/validate.component';
// import { AuthClientesGuard } from "@guards/auth-clientes.guard";
// import { NonAuthGuard } from "@guards/non-auth.guard";
// import { AuthGuard } from "@guards/auth.guard";
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'products',
        children: [
          { path: '', component: ProductsComponent },
          { path: 'show/:id', component: ProdetComponent },
        ],
      },
      {
        path: 'shopping-cart',
        // canActivate: [AuthClientesGuard],
        // canActivateChild: [AuthClientesGuard],
        children: [
          { path: '', component: ShoppingCartComponent },
          { path: 'pago/:id', component: CheckoutComponent },
          { path: 'validate', component: ValidateComponent },
        ],
      },
      { path: 'singin', component: SinginComponent },
      { path: 'singup', component: SingupComponent },
      { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
