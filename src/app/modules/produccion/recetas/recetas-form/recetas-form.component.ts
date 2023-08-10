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

@Component({
  selector: 'app-recetas-form',
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.css'],
  providers: [MessageService, DialogService],
})
export class RecetasFormComponent implements OnInit, OnDestroy {
  recetaForm!: FormGroup;
  title = '';
  tipoForm = '';
  estatus: Estatus[] = [];
  productos: Producto[] = [];
  receta: Receta = {
    idReceta: 0,
    codigo: '',
    cantidad: 0,
    costo: 0,
    idProducto: 0,
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
    private productosSvc: ProductosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getReceta();
    this.getEstatus();
    this.getProductos();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  show() {
    this.ref = this.dialogService.open(ProdListComponent, {
      header: 'Seleccione un producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageSvc.add({
          severity: 'info',
          summary: 'Producto seleccionado',
          detail: product.name,
        });
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
      idProducto: ['', Validators.required],
    });
  }

  getEstatus(): void {
    this.estatusSvc.getEstatus().subscribe((estatus) => {
      this.estatus = estatus;
    });
  }

  getReceta(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.recetasSvc.getReceta(+id).subscribe((receta) => {
        this.receta = receta;
        this.tipoForm = 'E';
        this.title = `Receta: ${this.receta.codigo}`;
        this.recetaForm.patchValue(this.receta);
      });
    } else {
      this.title = 'Nueva receta';
      this.tipoForm = 'N';
    }
  }

  getProductos(): void {
    this.productosSvc.getProductos().subscribe((productos) => {
      this.productos = productos;
      console.log(this.productos);
    });
  }

  cancelar(): void {
    this.router.navigate(['admin', 'produccion', 'recetas']);
  }

  onSubmit(): void {
    switch (this.tipoForm) {
      case 'N':
        // this.agregar();
        break;
      case 'E':
        // this.editar();
        break;
      default:
        break;
    }
  }
}
