import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { Usuario } from '@models/usuarios';
import { UsuariosService } from '@services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
})
export class UsuariosListComponent implements OnInit {
  usuarios!: Usuario[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedUsuarios!: Usuario[];

  constructor(private usuariosSvc: UsuariosService) {}

  ngOnInit(): void {}

  loadUsuarios(event: TableLazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.usuariosSvc.getUsuarios({ lazyEvent: event }).subscribe((res) => {
        this.usuarios = res;
        this.totalRecords = res.length;
        this.loading = false;
      });
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedUsuarios = value;
  }
}
