import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

import { Proveedor } from '@models/proveedores';
import { ProveedoresService } from '@services/proveedores.service';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ProveedoresListComponent implements OnInit {
  proveedores!: Proveedor[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedProveedor!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private proveedoresSvc: ProveedoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores() {
    this.loading = true;
    setTimeout(() => {
      this.proveedoresSvc.getProveedores().subscribe((proveedor) => {
        this.proveedores = proveedor;
        this.totalRecords = proveedor.length;
        this.loading = false;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Proveedor seleccionado',
      detail: `${event.data.razonSocial}`,
    });
  }

  deleteProveedor() {
    this.confirmationSvc.confirm({
      message: '¿Está seguro que desea eliminar el proveedor?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proveedoresSvc
          .deleteProveedor(this.selectedProveedor.id)
          .subscribe((res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Proveedor eliminado',
              detail: `${this.selectedProveedor.nombre}`,
            });
            this.router.navigate(['admin', 'proveedores']);
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Cancelado',
              detail: 'Eliminación cancelada',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Eliminación cancelada',
            });
            break;
        }
      },
    });
    this.router.navigate(['admin', 'proveedores']);
  }
}
