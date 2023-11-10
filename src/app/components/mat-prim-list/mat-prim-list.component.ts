import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
//TODO: Importar el modelo de materias primas por el momento se importa el de productos pruebas
// import { Product } from '@models/product';
//TODO: Importar el servicio de materias primas por el momento se importa el de productos
// import { ProductService } from '@services/product.service';
import { Ingrediente } from '@models/ingrediente';
import { FormGroup } from '@angular/forms';
import { MateriaPrima } from '@models/materiasprimas';
import { MateriasPrimasService } from '@services/materiasprimas.service';
import { Estatus } from '@models/estatus';
import { EstatusService } from '@services/estatus.service';
import { IngredientesService } from '@services/ingredientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matprim-list',
  template: `
    <div class="card">
      <p-table
        #dt
        [value]="materiasPrimas"
        responsiveLayout="scroll"
        [paginator]="true"
        [rows]="5"
        [selectionPageOnly]="true"
        [globalFilterFields]="['nombre', 'estatus']"
        [responsive]="true"
        [(selection)]="selectedMateriaPrima"
        [rowHover]="true"
      >
        <ng-template pTemplate="caption">
          <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center justify-content-between gap-2">
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
            </div>
            <div class="flex align-items-center justify-content-between gap-2">
              <button
                type="button"
                pButton
                label="Guardar"
                (click)="guardar(selectedMateriaPrima)"
                class="p-button-success p-button-rounded p-mr-2"
                icon="pi pi-check"
              ></button>
              <button
                type="button"
                pButton
                label="Eliminar"
                (click)="eliminar(selectedMateriaPrima)"
                class="p-button-danger p-button-rounded"
                icon="pi pi-times"
              ></button>
            </div>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 4rem">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th pSortableColumn="nombre">
              Materia Prima <p-sortIcon field="vin"></p-sortIcon>
            </th>
            <th pSortableColumn="year">Imagen</th>
            <th pSortableColumn="cantidad">
              Cantidad Necesaria <p-sortIcon field="cantidad"></p-sortIcon>
            </th>
            <th pSortableColumn="estatus">
              Estatus <p-sortIcon field="estatus"></p-sortIcon>
            </th>
            <!-- <th style="width: 4em"></th> -->
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-materia let-editing="editing">
          <tr>
            <td>
              <p-tableCheckbox [value]="materia"></p-tableCheckbox>
            </td>
            <td>
              {{ materia.nombre }}
            </td>
            <td>
              <img
                [src]="materia.foto"
                [alt]="materia.nombre"
                class="w-4rem h-4rem shadow-2"
              />
            </td>
            <td
              [pEditableColumn]="materia.cantidad"
              pEditableColumnField="cantidad"
            >
              <p-cellEditor>
                <ng-template pTemplate="input">
                  <p-inputNumber
                    [(ngModel)]="materia.cantidad"
                    [min]="0"
                    [minFractionDigits]="4"
                    [maxFractionDigits]="4"
                  >
                  </p-inputNumber>
                </ng-template>
                <ng-template pTemplate="output">
                  {{ materia.cantidad | number : '1.4-4' }}
                </ng-template>
              </p-cellEditor>
            </td>
            <td>
              <p-tag
                [value]="materia.estatus"
                [severity]="getSeverity(materia.estatus)"
              ></p-tag>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class MatPrimListComponent implements OnInit {
  // products: Product[] = [];
  materiasPrimas: MateriaPrima[] = [];
  estatus: Estatus[] = [];
  listadoIngredientes: Ingrediente[] = [];
  // selectedProducts: Product[] = [];
  selectedMateriaPrima: any[] = [];
  ingredienteForm!: FormGroup;
  idReceta: number = 0;

  constructor(
    private route: ActivatedRoute,
    private estatusSvc: EstatusService,
    private ingredienteSvc: IngredientesService,
    private materiasPrimasSvc: MateriasPrimasService,
    // private productService: ProductService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    // this.productService
    //   .getProductsSmall()
    //   .then((products) => (this.products = products));
    this.getMateriasPrimas();
    this.getEstatus();
    this.idReceta = this.route.snapshot.params['id'];
    if (this.idReceta) {
      console.log(this.idReceta);
    } else {
      console.log('No hay id');
    }
  }

  // selectProduct(product: Product) {
  //   // this.ref.close(product);
  // }

  getMateriasPrimas() {
    this.materiasPrimasSvc.getMateriasPrimas().subscribe((res) => {
      this.materiasPrimas = res;
    });
  }

  getEstatus() {
    this.estatusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'warning';
      case 'cancelado':
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
  // guardar(selectedProducts: Product[]) {
  guardar(selectedMateriaPrima: any[]) {
    //Se ´puede guardar en localstorage el listado de ingrediente, cada que guarde debe eliminar y guardar los nuevos
    // console.log(selectedProducts);
    this.listadoIngredientes = [];
    selectedMateriaPrima.forEach((element) => {
      let ingrediente: Ingrediente = {
        idReceta: this.idReceta ? Number(this.idReceta) : 0,
        cantidad: element.cantidad,
        idMateriaPrima: element.id,
      };
      this.listadoIngredientes.push(ingrediente);
    });
    if (this.listadoIngredientes.length > 0) {
      this.listadoIngredientes.forEach((element) => {
        this.ingredienteSvc.addIngrediente(element).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
    // console.log(this.listadoIngredientes);
    this.ref.close(this.listadoIngredientes);
  }

  eliminar(selectedMateriaPrima: any[]) {
    selectedMateriaPrima.forEach((element) => {
      this.ingredienteSvc
        .deleteIngrediente(this.idReceta, element.id)
        .subscribe(
          (res) => {
            this.ref.close(res);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
}
