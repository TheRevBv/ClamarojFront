import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstatusService } from '@services/estatus.service';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@models/productos';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Estatus } from '@models/estatus';
import { FormGroup } from '@angular/forms';
import { MateriaPrima } from '@models/materiasprimas';
import { MateriasPrimasService } from '@services/materiasprimas.service';

// Interfaz extendida con la propiedad adicional
interface ProductoDetalle extends Producto {
  cantidad: number;
  subtotal: number;
}

interface MateriaPrimaDetalle extends MateriaPrima {
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
})
export class ProdListComponent implements OnInit {
  productosForm!: FormGroup;
  productos: Producto[] = [];
  materiasPrimas: MateriaPrima[] = [];
  selectedData: any[] = [];
  listadoProductos: any[] = [];
  estatus: Estatus[] = [];
  idPedido: number = 0;
  productosDetalle: ProductoDetalle[] = [];
  materiasPrimasDetalle: MateriaPrimaDetalle[] = [];
  data: any = [];
  loading: boolean = false;
  dropdownSettings = [
    {
      id: 1,
      label: 'Producto',
    },
    {
      id: 2,
      label: 'Materia Prima',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public ref: DynamicDialogRef,
    private estatusSvc: EstatusService,
    private materiaPrimaSvc: MateriasPrimasService,
    private productoSvc: ProductosService
  ) {}

  ngOnInit() {
    this.getProductos();
    this.getEstatus();
    this.idPedido = this.route.snapshot.params['id'];
    if (this.idPedido) {
      console.log(this.idPedido);
    } else {
      console.log('No hay id');
    }
  }

  onDropdownChange(event: any) {
    this.loading = true;
    this.data = [];
    console.log(event);
    if (event.value == 1) {
      setTimeout(() => {
        this.getProductos();
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.getMateriasPrimas();
        this.loading = false;
      }, 1000);
    }
  }

  onInputChange(articulo: any) {
    articulo.subtotal = articulo.cantidad * articulo.precio;
  }

  getEstatus() {
    this.estatusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
    });
  }

  getProductos() {
    this.productoSvc.getProductos().subscribe((res) => {
      this.productos = res;
      //Agregar al modelo de productos el campo cantidad
      this.productosDetalle = this.productos.map((producto) => {
        return { ...producto, cantidad: 0, subtotal: 0 };
      });
      this.data = this.productosDetalle;
      // console.log(this.productosDetalle);
    });
  }

  getMateriasPrimas() {
    this.materiaPrimaSvc.getMateriasPrimas().subscribe((res) => {
      this.materiasPrimas = res;
      //Agregar al modelo de productos el campo cantidad y el subtotal
      this.materiasPrimasDetalle = this.materiasPrimas.map((materiaPrima) => {
        return { ...materiaPrima, cantidad: 0, subtotal: 0 };
      });
      this.data = this.materiasPrimasDetalle;
      // console.log(this.materiasPrimasDetalle);
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

  guardar() {
    console.log(this.selectedData);
    this.ref?.close(this.selectedData);
    //Agregar la cantidad al producto
  }
}
