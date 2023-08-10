import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
//TODO: Importar el modelo de materias primas por el momento se importa el de productos pruebas
import { Product } from '@models/product';
//TODO: Importar el servicio de materias primas por el momento se importa el de productos
import { ProductService } from '@services/product.service';
import { Ingrediente } from '@models/ingrediente';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prod-list',
  template: `
    <div class="card">
      <p-table
        #dt
        [value]="products"
        responsiveLayout="scroll"
        [paginator]="true"
        [rows]="5"
        [selectionPageOnly]="true"
        [globalFilterFields]="[
          'name',
          'country.name',
          'representative.name',
          'status'
        ]"
        [responsive]="true"
        [(selection)]="selectedProducts"
        [rowHover]="true"
      >
        <ng-template pTemplate="caption">
          <div class="flex align-items-center justify-content-between">
            <h5 class="m-0">Administrador de ingredientes</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input
                pInputText
                type="text"
                (input)="dt.filterGlobal(getValue($event), 'contains')"
                placeholder="Buscar..."
              />
            </span>
            <button
              type="button"
              pButton
              label="Guardar"
              (click)="guardar(selectedProducts)"
              class="p-button-success p-button-rounded p-mr-2"
              icon="pi pi-check"
            ></button>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 4rem">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th pSortableColumn="name">
              Materia Prima <p-sortIcon field="vin"></p-sortIcon>
            </th>
            <th pSortableColumn="year">Image</th>
            <th pSortableColumn="price">
              Brand <p-sortIcon field="price"></p-sortIcon>
            </th>
            <th pSortableColumn="inventoryStatus">
              Status <p-sortIcon field="inventoryStatus"></p-sortIcon>
            </th>
            <!-- <th style="width: 4em"></th> -->
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-editing="editing">
          <tr>
            <td>
              <p-tableCheckbox [value]="product"></p-tableCheckbox>
            </td>
            <td>{{ product.name }}</td>
            <td>
              <img
                src="https://primefaces.org/cdn/primeng/images/demo/product/{{
                  product.image
                }}"
                [alt]="product.image"
                class="w-4rem h-4rem shadow-2"
              />
            </td>
            <td [pEditableColumn]="product.price" pEditableColumnField="price">
              <p-cellEditor>
                <ng-template pTemplate="input">
                  <input pInputText type="text" [(ngModel)]="product.price" />
                </ng-template>
                <ng-template pTemplate="output">
                  {{ product.price | currency : 'MXN' : 'symbol' : '1.2-2' }}
                </ng-template>
              </p-cellEditor>
            </td>
            <!-- <td> works
              <p-inputNumber [ngModel]="product.price"></p-inputNumber>
            </td> -->
            <td>
              <p-tag
                [value]="product.inventoryStatus"
                [severity]="getSeverity(product.inventoryStatus)"
              ></p-tag>
            </td>
            <!-- <td>
              <button
                type="button"
                pButton
                icon="pi pi-plus"
                (click)="selectProduct(product)"
              ></button>
            </td> -->
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class ProdListComponent implements OnInit {
  products: Product[] = [];
  listadoIngredientes: Ingrediente[] = [];
  selectedProducts: Product[] = [];
  ingredienteForm!: FormGroup;

  constructor(
    private productService: ProductService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((products) => (this.products = products));
  }

  selectProduct(product: Product) {
    // this.ref.close(product);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }

  getValue(event: any) {
    return event.target.value;
  }
  //TODO: Guardar los ingredientes seleccionados
  //Se debe guardar el id de la materia prima y la cantidad
  guardar(selectedProducts: Product[]) {
    //Se ´puede guardar en localstorage el listado de ingrediente, cada que guarde debe eliminar y guardar los nuevos
    console.log(selectedProducts);
    this.listadoIngredientes = [];
    // selectedProducts.forEach((element) => {
    //   let ingrediente: Ingrediente = {
    //     idIngrediente: 0,
    //     cantidad: 0,
    //     costo: 0,
    //     idProducto: element.id,
    //   };
    //   this.listadoIngredientes.push(ingrediente);
    // });
    this.ref.close(this.listadoIngredientes);
  }
}
