import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recetas',
    loadChildren: () =>
      import('./recetas/recetas.module').then((m) => m.RecetasModule),
  },
  {
    path: 'unidades-medida',
    loadChildren: () =>
      import('./unidad-medida/unidad-medida.module').then(
        (m) => m.UnidadMedidaModule
      ),
  },
  {
    path: '**',
    redirectTo: 'recetas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduccionRoutingModule {}
