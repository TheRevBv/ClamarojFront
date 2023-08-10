import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableLazyLoadEvent } from 'primeng/table';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { EstatusService } from '@services/estatus.service';
import { Estatus } from '@models/estatus';
import { Receta } from '@models/recetas';
import { RecetasService } from '@services/recetas.service';

@Component({
  selector: 'app-recetas-list',
  templateUrl: './recetas-list.component.html',
  styleUrls: ['./recetas-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class RecetasListComponent implements OnInit {
  recetas!: Receta[];
  totalRecords!: number;
  loading = true;
  selectAll: boolean = false;
  selectedReceta!: any;
  estatus: Estatus[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationSvc: ConfirmationService,
    private messageSvc: MessageService,
    private recetasSvc: RecetasService,
    private router: Router,
    private statusSvc: EstatusService
  ) {}

  ngOnInit() {}

  loadRecetas(event: TableLazyLoadEvent) {
    this.getRecetas(event);
  }

  getRecetas(event: TableLazyLoadEvent) {
    this.recetasSvc.getRecetas({ lazyEvent: JSON.stringify(event) }).subscribe(
      (receta) => {
        this.recetas = receta;
        this.totalRecords = receta.length;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onRowSelect(event: any) {
    this.messageSvc.add({
      severity: 'info',
      summary: 'Receta seleccionada',
      detail: `${event.data.codigo}`,
    });
  }

  deleteReceta() {
    this.confirmationSvc.confirm({
      message: `¿Desea eliminar la receta ${this.selectedReceta.codigo}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.recetasSvc
          .deleteReceta(this.selectedReceta.idReceta)
          .subscribe((data) => {
            this.getRecetas({} as TableLazyLoadEvent);
          });
        this.messageSvc.add({
          severity: 'success',
          summary: 'Receta eliminada',
          detail: `Receta ${this.selectedReceta.codigo} eliminada correctamente`,
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageSvc.add({
              severity: 'error',
              summary: 'Receta no eliminada',
              detail: `Receta ${this.selectedReceta.codigo} no eliminada`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageSvc.add({
              severity: 'warn',
              summary: 'Eliminación cancelada',
              detail: `Eliminación de receta ${this.selectedReceta.codigo} cancelada`,
            });
            break;
        }
      },
    });
  }
}
