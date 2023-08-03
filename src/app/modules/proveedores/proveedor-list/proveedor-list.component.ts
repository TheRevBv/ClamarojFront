import { Component, OnInit } from '@angular/core';
import { Proveedor } from '@app/models/proveedores';
import { ProveedorService } from '@app/services/proveedores.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})

export class ProveedorListComponent implements OnInit {

  proveedores!: Proveedor[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedProveedores!: Proveedor[];

  constructor(private proveedoresSvc: ProveedorService) { }

  ngOnInit(): void { }

  loadProveedores(event: TableLazyLoadEvent) {
    this.loading = true;
    this.proveedoresSvc
      .getProveedores({ lazyEvent: JSON.stringify(event) })
      .subscribe((proveedor) => {
        this.proveedores = proveedor;
        this.totalRecords = proveedor.length;
        this.loading = false;
      });
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedProveedores = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.proveedoresSvc.getProveedores().subscribe((res) => {
        this.selectedProveedores = res;
        this.selectAll = true;
      });
    } else {
      this.selectedProveedores = [];
      this.selectAll = false;
    }
  }

}
