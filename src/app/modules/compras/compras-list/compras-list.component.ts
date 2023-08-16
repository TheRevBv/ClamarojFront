import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { ComprasService } from '@services/compras.service';

import { Estatus } from '@models/estatus';
import { Compra } from '@models/compras';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ComprasListComponent implements OnInit {
  compras: Compra[] = [];
  selectedCompra!: any;
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
    private comprasSvc: ComprasService
  ) {}

  ngOnInit(): void {
    this.loadCompras();
  }

  loadCompras() {
    this.loading = true;
    setTimeout(() => {
      this.comprasSvc.getCompras().subscribe((compra) => {
        this.compras = compra;
        this.totalRecords = compra.length;
        this.loading = false;
      });
    }, 1000);
  }

  getEstatus() {
    this.statusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
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

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Selected',
      detail: `${event.data.id}`,
    });
  }

  deleteCompra() {
    const id = this.selectedCompra.id;
    this.confirmationSvc.confirm({
      message: '¿Estás seguro de eliminar esta compra?',
      header: 'Eliminar compra',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.comprasSvc.deleteCompra(id).subscribe((res) => {
        //   this.messageSvc.add({
        //     severity: 'success',
        //     summary: 'Compra eliminada',
        //     detail: `Compra eliminada correctamente`,
        //   });
        //   this.loadCompras();
        // });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Compra no eliminada',
              detail: `Compra no eliminada`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Compra no eliminada',
              detail: `Compra no eliminada`,
            });
            break;
        }
      },
    });
  }
}
