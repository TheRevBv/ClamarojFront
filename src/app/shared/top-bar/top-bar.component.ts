import { Component, OnInit } from '@angular/core';
import { Usuario } from '@models/usuarios';
import { ProveedoresService } from '@services/proveedores.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  usuario!: Usuario;

  constructor(public proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  logout() {
    this.proveedoresService.logout();
  }

  getUsuario() {
    this.usuario = this.proveedoresService.proveedor!;
  }
}
