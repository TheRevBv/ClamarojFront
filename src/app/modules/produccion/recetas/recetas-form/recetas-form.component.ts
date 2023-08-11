import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { RecetasService } from '@services/recetas.service';

import { Estatus } from '@models/estatus';
import { Receta } from '@models/recetas';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '@models/product'; //Interfaz de prueba
import { Producto } from '@models/productos';
import { ProdListComponent } from '@components/prod-list/prod-list.component';
import { ProductosService } from '@services/productos.service';
import { IngredientesService } from '@services/ingredientes.service';

@Component({
  selector: 'app-recetas-form',
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.css'],
  providers: [MessageService, DialogService, RecetasService, ProductosService],
})
export class RecetasFormComponent implements OnInit, OnDestroy {
  recetaForm!: FormGroup;
  title = '';
  tipoForm = '';
  ingredientes: any = [];
  estatus: Estatus[] = [];
  productos: Producto[] = [];
  receta: Receta = {
    idReceta: 0,
    codigo: '',
    cantidad: 0,
    costo: 0,
    idProducto: 0,
    idStatus: 0,
  };
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recetasSvc: RecetasService,
    private estatusSvc: EstatusService,
    private messageSvc: MessageService,
    private ingredientesSvc: IngredientesService,
    private productosSvc: ProductosService
  ) {
    this.getEstatus();
    this.getProductos();
    this.createForm();
  }

  ngOnInit(): void {
    this.getParams();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  show() {
    this.ref = this.dialogService.open(ProdListComponent, {
      header: 'Seleccione una materia prima',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((ingredientes: any[]) => {
      if (ingredientes) {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Se han agregado ingredientes',
          detail: `${ingredientes.length} ingredientes agregados`,
        });
      } else {
        this.messageSvc.add({
          severity: 'info',
          summary: 'No se han agregado ingredientes',
          detail: ``,
        });
      }
      if (this.receta.idReceta) {
        this.getIngredientesByReceta(this.receta.idReceta.toString());
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageSvc.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  createForm(): void {
    this.recetaForm = this.fb.group({
      codigo: ['', Validators.required],
      cantidad: ['', Validators.required],
      costo: ['', Validators.required],
      idProducto: new FormControl<Producto | null>(null),
      idStatus: new FormControl<Estatus | null>(null),
    });
  }

  getEstatus(): void {
    this.estatusSvc.getEstatus().subscribe((estatus) => {
      this.estatus = estatus;
    });
  }

  getParams() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Editar receta #' + id;
      this.tipoForm = 'E';
      this.getReceta(id);
      this.getIngredientesByReceta(id);
    } else {
      this.title = 'Registrar receta';
      this.tipoForm = 'N';
    }
  }

  getIngredientesByReceta(id: string): void {
    this.ingredientesSvc.getIngredienteByReceta(+id).subscribe((res) => {
      this.ingredientes = res;
    });
  }

  getReceta(id: string): void {
    this.recetasSvc.getReceta(+id).subscribe((res) => {
      this.receta = res;
      this.recetaForm.patchValue(this.receta);
    });
  }

  getProductos(): void {
    this.productosSvc.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  cancelar(): void {
    this.router.navigate(['admin', 'produccion', 'recetas']);
  }

  onSubmit(): void {
    switch (this.tipoForm) {
      case 'N':
        this.agregar();
        break;
      case 'E':
        this.editar();
        break;
      default:
        break;
    }
  }

  agregar(): void {
    let { codigo, cantidad, costo, idProducto, idStatus } =
      this.recetaForm.value;
    this.receta = {
      idReceta: 0,
      codigo,
      cantidad,
      costo,
      idProducto,
      idStatus,
    };
    this.recetasSvc.addReceta(this.receta).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Resultado',
          detail: 'Receta agregada correctamente',
        });
        this.router.navigate(['admin', 'produccion', 'recetas']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar la receta',
        });
      }
    );
    console.log(this.receta);
  }

  editar(): void {
    let { codigo, cantidad, costo, idProducto, idStatus } =
      this.recetaForm.value;

    this.receta = {
      idReceta: this.receta.idReceta,
      codigo,
      cantidad,
      costo,
      idProducto,
      idStatus,
    };

    this.recetasSvc.updateReceta(this.receta).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Resultado',
          detail: 'Receta editada correctamente',
        });
        this.router.navigate(['admin', 'produccion', 'recetas']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al editar la receta',
        });
      }
    );
    console.log(this.receta);
  }
}
