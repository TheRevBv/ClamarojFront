import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { Usuario } from '@models/usuarios';
import { UsuariosService } from '@services/usuarios.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private usuariosSvc: UsuariosService,
    private messageSvc: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService
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
    }, 1000);
  }

  onRowSelect(event: any) {
    // this.selectedUsuario = event.data;
    // console.log(this.selectedUsuario);
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
            this.router.navigate(['/admin/usuarios']);
          });
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
}
