import { Component, OnInit } from '@angular/core';
// import { LazyLoadEvent } from 'primeng/api';
import { Cliente } from '@models/clientes';
import { ClientesService } from '@services/clientes.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
})
export class ClientesListComponent implements OnInit {
  showDialog() {
    throw new Error('Method not implemented.');
  }
  clientes!: Cliente[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedClientes!: Cliente[];

  constructor(private clientesSvc: ClientesService) {}

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

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedClientes = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.clientesSvc.getClientes().subscribe((res) => {
        this.selectedClientes = res;
        this.selectAll = true;
      });
    } else {
      this.selectedClientes = [];
      this.selectAll = false;
    }
  }
}
