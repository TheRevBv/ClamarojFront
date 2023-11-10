import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { MateriaPrima } from '@models/materiasprimas';
import { MateriasPrimasService } from '@services/materiasprimas.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-materia-prima-list',
  templateUrl: './materia-prima-list.component.html',
  styleUrls: ['./materia-prima-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class MateriaPrimaListComponent implements OnInit {
  materiasPrimas!: MateriaPrima[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedMateriaPrima!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private materiasPrimasSvc: MateriasPrimasService,
    private messageSvc: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMateriasPrimas();
  }

  loadMateriasPrimas() {
    this.loading = true;
    setTimeout(() => {
      this.materiasPrimasSvc.getMateriasPrimas().subscribe((res) => {
        console.log(res);
        this.materiasPrimas = res;
        this.totalRecords = res.length;
        this.loading = false;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Materia prima seleccionada',
      detail: `${event.data.nombre}`,
    });
  }

  deleteMateriaPrima() {
    this.confirmationSvc.confirm({
      message: `¿Está seguro de eliminar al materia prima ${this.selectedMateriaPrima.nombre}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.materiasPrimasSvc
          .deleteMateriaPrima(this.selectedMateriaPrima.id!)
          .subscribe((res) => {
            this.messageSvc.add({
              severity: 'success',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedMateriaPrima.nombre} no ha sido eliminado`,
            });
            this.router.navigate(['/admin/inventario/materiasprimas']);
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedMateriaPrima.nombre} no ha sido eliminado`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `${this.selectedMateriaPrima.nombre} no ha sido eliminado`,
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
