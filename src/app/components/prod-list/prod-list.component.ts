import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstatusService } from '@services/estatus.service';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@models/productos';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Estatus } from '@models/estatus';
import { FormGroup } from '@angular/forms';

// Interfaz extendida con la propiedad adicional
interface ProductoConCantidad extends Producto {
  cantidad: number;
}

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
})
export class ProdListComponent implements OnInit {
  productosForm!: FormGroup;
  productos: Producto[] = [];
  selectedProductos: any[] = [];
  listadoProductos: any[] = [];
  estatus: Estatus[] = [];
  idPedido: number = 0;
  productosConCantidad: ProductoConCantidad[] = [];

  constructor(
    private productoSvc: ProductosService,
    private estatusSvc: EstatusService,
    private route: ActivatedRoute,
    public ref: DynamicDialogRef
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

  getEstatus() {
    this.estatusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
    });
  }

  getProductos() {
    this.productoSvc.getProductos().subscribe((res) => {
      this.productos = res;
      //Agregar al modelo de productos el campo cantidad
      this.productosConCantidad = this.productos.map((producto) => {
        return { ...producto, cantidad: 0 };
      });
      // console.log(this.productosConCantidad);
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
    console.log(this.selectedProductos);
    this.ref?.close(this.selectedProductos);
    //Agregar la cantidad al producto
  }
}
