import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { Producto } from '@models/productos';
import { ProductosService } from '@services/productos.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ProductoListComponent implements OnInit {
  productos!: Producto[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedProducto!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private productosSvc: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos() {
    this.loading = true;
    setTimeout(() => {
      this.productosSvc.getProductos().subscribe((res) => {
        this.productos = res;
        this.totalRecords = res.length;
        this.loading = false;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Producto seleccionado',
      detail: `${event.data.nombre}`,
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'danger';
      default:
        return 'warning';
    }
  }

  deleteProducto() {
    this.confirmationSvc.confirm({
      message: `¿Está seguro de eliminar al producto ${this.selectedProducto.nombre}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productosSvc
          .deleteProducto(this.selectedProducto.idProducto!)
          .subscribe((res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Producto eliminado',
              detail: `${this.selectedProducto.nombre} ha sido eliminado`,
            });
            this.router.navigate(['/admin/inventario/productos']);
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedProducto.nombre} no ha sido eliminado`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedProducto.nombre} no ha sido eliminado`,
            });
            break;
        }
      },
    });
  }
}
