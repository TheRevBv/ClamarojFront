import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableLazyLoadEvent } from 'primeng/table';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { EstatusService } from '@services/estatus.service';
import { UsuariosService } from '@services/usuarios.service';
import { Estatus } from '@models/estatus';
import { Usuario } from '@models/usuarios';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UsuariosListComponent implements OnInit {
  usuarios!: Usuario[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedUsuario!: any;
  estatus: Estatus[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private router: Router,
    private statusSvc: EstatusService,
    private usuariosSvc: UsuariosService
  ) {}

  ngOnInit(): void {}

  loadUsuarios(event: TableLazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.usuariosSvc
        .getUsuarios({ lazyEvent: JSON.stringify(event) })
        .subscribe((usuario) => {
          this.usuarios = usuario;
          this.totalRecords = usuario.length;
          this.loading = false;
        });
      this.statusSvc.getEstatus().subscribe((data) => {
        this.estatus = data;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Usuario seleccionado',
      detail: `${event.data.nombre}`,
    });
  }

  deleteUsuario() {
    // console.log(this.selectedUsuario);
    this.confirmationSvc.confirm({
      message: `¿Está seguro de eliminar al usuario ${this.selectedUsuario.nombre}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuariosSvc
          .deleteUsuario(this.selectedUsuario.id!)
          .subscribe((res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Usuario eliminado',
              detail: `${this.selectedUsuario.nombre} ha sido eliminado`,
            });
            // this.router.navigate(['admin', 'usuarios']);
          });
        this.loadUsuarios({ first: 0, rows: 10 });
        this.router.navigate(['admin', 'usuarios']);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedUsuario.nombre} no ha sido eliminado`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedUsuario.nombre} no ha sido eliminado`,
            });
            break;
        }
      },
    });
  }

  getSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'inactivo':
        return 'danger';
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      default:
        return 'info';
    }
  }
}
