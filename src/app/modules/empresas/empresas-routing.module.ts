import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '' || 'home', 
    title: 'Empresas',
    component: HomeComponent,
  },
  {
    path : 'about',
    title: 'Nosotros',
    component : AboutComponent
  },
  {
    path : 'products',
    title: 'Productos',
    component : GaleriaComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresasRoutingModule {}
