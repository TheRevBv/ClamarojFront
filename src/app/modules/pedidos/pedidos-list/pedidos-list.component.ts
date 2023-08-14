import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { PedidosService } from '@services/pedidos.service';

import { Estatus } from '@models/estatus';
import { Pedido } from '@models/pedidos';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PedidosListComponent implements OnInit {
  pedidos: Pedido[] = [];
  selectedPedido!: any;
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
    private pedidosSvc: PedidosService
  ) {}

  ngOnInit(): void {}

  loadPedidos() {
    this.loading = true;
    setTimeout(() => {
      this.pedidosSvc.getPedidos().subscribe((pedido) => {
        this.pedidos = pedido;
        this.totalRecords = pedido.length;
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
      summary: 'Pedido seleccionado',
      detail: `${event.data.idPedido}`,
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

  deletePedido() {
    const id = this.selectedPedido.idPedido;
    this.confirmationSvc.confirm({
      message: '¿Está seguro de que desea eliminar este pedido?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pedidosSvc.deletePedido(id).subscribe(
          (res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail: 'Pedido eliminado correctamente',
            });
            this.loadPedidos();
          },
          (err) => {
            this.messageSvc.add({
              severity: 'error',
              summary: '¡Error!',
              detail: 'Error al eliminar pedido',
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'info',
              summary: 'Cancelado',
              detail: 'Has rechazado la eliminación',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Has cancelado la eliminación',
            });
            break;
        }
      },
    });
  }
}
