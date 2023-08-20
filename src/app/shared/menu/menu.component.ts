import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@shared/services/layout.service';
import { UsuariosService } from '@services/usuarios.service';
import { Usuario } from '@models/usuarios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  // providers: [LayoutService, UsuariosService],
})
export class MenuComponent implements OnInit {
  usuario!: Usuario;

  constructor(
    private latyoutService: LayoutService,
    private usuarioSvc: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  onToggleSidebar(): void {
    this.latyoutService.toggleSidebarVisibility();
  }

  logout() {
    this.usuarioSvc.logout();
  }

  getUsuario() {
    this.usuario = this.usuarioSvc.usuario!;
  }
}
