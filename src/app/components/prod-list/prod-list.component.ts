import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstatusService } from '@services/estatus.service';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@models/productos';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Estatus } from '@models/estatus';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
})
export class ProdListComponent implements OnInit {
  productos: Producto[] = [];
  selectedProductos: any[] = [];
  estatus: Estatus[] = [];

  constructor(
    private productoSvc: ProductosService,
    private estatusSvc: EstatusService,
    private route: ActivatedRoute,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {}

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
}
