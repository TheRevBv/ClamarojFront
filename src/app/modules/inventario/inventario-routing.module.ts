import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos.module').then((m) => m.ProductosModule),
  },
  {
    path: 'materias-primas',
    loadChildren: () =>
    import('./materias-primas/materias-primas.module').then((m)=>
    m.MateriasPrimasModule)
  },
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}