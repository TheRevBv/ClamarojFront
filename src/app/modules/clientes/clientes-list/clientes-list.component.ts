import { Component, OnInit } from '@angular/core';
// import { LazyLoadEvent } from 'primeng/api';
import { Cliente } from '@models/clientes';
import { ClientesService } from '@services/clientes.service';
import { TableLazyLoadEvent } from 'primeng/table';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ClientesListComponent implements OnInit {
  clientes!: Cliente[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedCliente!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesSvc: ClientesService,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.loading = true;
    setTimeout(() => {
      this.clientesSvc.getClientes().subscribe((cliente) => {
        this.clientes = cliente;
        this.totalRecords = cliente.length;
        this.loading = false;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    // this.selectedCliente = event.data;
    // console.log(this.selectedCliente);
    this.messageSvc.add({
      severity: 'info',
      summary: 'Cliente seleccionado',
      detail: `${event.data.nombre}`,
    });
  }

  deleteCliente() {
    // console.log(this.selectedCliente);
    this.confirmationSvc.confirm({
      message: `¿Está seguro de eliminar al cliente ${this.selectedCliente.nombre}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientesSvc
          .deleteCliente(this.selectedCliente.idCliente!)
          .subscribe((res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Cliente eliminado',
              detail: `${this.selectedCliente.nombre} ha sido eliminado`,
            });
            this.router.navigate(['/admin/clientes']);
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedCliente.nombre} no ha sido eliminado`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedCliente.nombre} no ha sido eliminado`,
            });
            break;
        }
      },
    });
    this.router.navigate(['admin', 'clientes']);
  }
}
