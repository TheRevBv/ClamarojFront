import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@primeng/prime-ng.module';

// import { MatPrimListComponent } from './prod-list/prod-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPrimListComponent } from './mat-prim-list/mat-prim-list.component';
import { ProdListComponent } from './prod-list/prod-list.component';

@NgModule({
  declarations: [MatPrimListComponent, ProdListComponent],
  imports: [CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsModule {}
