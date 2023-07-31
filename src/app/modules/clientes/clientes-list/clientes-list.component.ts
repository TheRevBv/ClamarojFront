import { Component, OnInit } from '@angular/core';
// import { LazyLoadEvent } from 'primeng/api';
import { Cliente } from '@models/clientes';
import { ClientesService } from '@services/clientes.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  providers: [MessageService],
})
export class ClientesListComponent implements OnInit {
  clientes!: Cliente[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedCliente!: Cliente;

  constructor(
    private clientesSvc: ClientesService,
    private messageSvc: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loadClientes(event: TableLazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.clientesSvc
        .getClientes({ lazyEvent: JSON.stringify(event) })
        .subscribe((cliente) => {
          this.clientes = cliente;
          this.totalRecords = cliente.length;
          this.loading = false;
        });
    }, 1000);
  }

  onRowSelect(event: any) {
    this.router.navigate(['editar', event.data.idCliente], {
      relativeTo: this.activatedRoute,
    });
    this.messageSvc.add({
      severity: 'info',
      summary: 'Cliente seleccionado',
      detail: `${event.data.nombre}`,
    });
  }
}
