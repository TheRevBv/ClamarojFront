import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { VentasService } from '@services/ventas.service';

import { Estatus } from '@models/estatus';
import { Ventas } from '@models/Ventas';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class VentasListComponent implements OnInit {
  ventas: Ventas[] = [];
  selectedVenta!: any;
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  estatus: Estatus[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private router: Router,
    private statusSvc: EstatusService,
    private ventasSvc: VentasService
  ) {}

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas() {
    this.loading = true;
    setTimeout(() => {
      this.ventasSvc.getVentas().subscribe((venta) => {
        this.ventas = venta;
        this.totalRecords = venta.length;
        this.loading = false;
      });
    }, 1000);
  }

  getEstatus() {
    this.statusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
    });
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Selected',
      detail: event.data.id,
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'pendiente':
        return 'warn';
      case 'enviado':
        return 'info';
      case 'entregado':
        return 'success';
      case 'cancelado':
        return 'danger';
      default:
        return 'dark';
    }
  }

  deleteVenta() {
    const id = this.selectedVenta.id;
    this.confirmationSvc.confirm({
      message: `¿Está seguro de eliminar la venta ${id}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.ventasSvc.deleteVenta(id).subscribe((res) => {
        //   this.messageSvc.add({
        //     severity: 'success',
        //     summary: 'Venta eliminada',
        //     detail: `La venta ${id} ha sido eliminada`,
        //   });
        //   this.loadVentas();
        // });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Eliminación cancelada',
              detail: `La venta ${id} no ha sido eliminada`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `La venta ${id} no ha sido eliminada`,
            });
            break;
        }
      },
    });
  }
}
