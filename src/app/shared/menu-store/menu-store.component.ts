import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { Usuario } from '@models/usuarios';
import { ClientesService } from '@services/clientes.service';

@Component({
  selector: 'app-menu-store',
  templateUrl: './menu-store.component.html',
  styleUrls: ['../../modules/home/home.component.scss'],
})
export class MenuStoreComponent implements OnInit {
  cliente: Usuario | null = null;
  isLogged: boolean = false;

  constructor(
    private renderer: Renderer2,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.cliente = this.clientesService.cliente;
    this.isLogged = this.clientesService.cliente ? true : false;
  }

  logout() {
    this.clientesService.logout();
    this.isLogged = false;
  }
}
