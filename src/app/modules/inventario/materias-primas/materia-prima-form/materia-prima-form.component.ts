import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '@models/proveedores';
import { UnidadMedida } from '@models/unidades-medida';
import { MateriaPrima } from '@models/materiasprimas';
import { Estatus } from '@models/estatus';
import { MateriasPrimasService } from '@services/materiasprimas.service';
import { ProveedoresService } from '@services/proveedores.service';
import { EstatusService } from '@app/services/estatus.service';
import { UnidadMedidaService } from '@app/services/unidad-medida.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-materia-prima-form',
  templateUrl: './materia-prima-form.component.html',
  styleUrls: ['./materia-prima-form.component.css'],
  providers: [MessageService],
})
export class MateriaPrimaFormComponent implements OnInit {
  materiaPrimaForm!: FormGroup;
  title = '';
  tipoForm: string = '';
  unidades_medida: UnidadMedida[] = [];
  proveedores: Proveedor[] = [];
  estatus: Estatus[] = [];
  unidad_medida!: UnidadMedida;
  proveedor!: Proveedor;

  materiaPrima: MateriaPrima = {
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    perecedero: 0,
    stock: 0,
    cant_minima: 0,
    cant_maxima: 0,
    unidad_medida: this.unidad_medida,
    precio: 0,
    foto: '',
    proveedor: this.proveedor,
    idStatus: 0,
    fechaRegistro: new Date(),
    fechaModificacion: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private router: Router,
    private proveedorSvc: ProveedoresService,
    private materiaPrimaSvc: MateriasPrimasService,
    private unidadMedidaSvc: UnidadMedidaService
  ) {
    this.materiaPrimaForm = this.fb.group({
      codigo: [''],
      nombre: [''],
      descripcion: [''],
      perecedero: [''],
      stock: [''],
      cant_minima: [''],
      cant_maxima: [''],
      unidad_medida: new FormControl<UnidadMedida | null>(null),
      precio: [''],
      foto: [''],
      proveedor: new FormControl<Proveedor | null>(null),
      idStatus: new FormControl<Estatus | null>(null),
      fechaRegistro: new Date(),
      fechaModificacion: new Date(),
    });
    this.getEstatus();
    this.getProveedores();
    this.getUnidadesMedida();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.title = `Editar materia prima ${id}`;
      this.tipoForm = 'E';
      this.materiaPrimaSvc.getMateriaPrima(+id).subscribe((data) => {
        this.materiaPrima = data;
        this.materiaPrimaForm.patchValue({
          codigo: this.materiaPrima.codigo,
          nombre: this.materiaPrima.nombre,
          descripcion: this.materiaPrima.descripcion,
          perecedero: this.materiaPrima.perecedero,
          stock: this.materiaPrima.stock,
          cant_minima: this.materiaPrima.cant_minima,
          cant_maxima: this.materiaPrima.cant_maxima,
          unidad_medida: this.materiaPrima.unidad_medida.idUnidadMedida,
          precio: this.materiaPrima.precio,
          foto: this.materiaPrima.foto,
          proveedor: this.materiaPrima.proveedor.idProveedor,
          idStatus: this.materiaPrima.idStatus,
        });
      });
    } else {
      this.title = 'Nueva materia prima';
      this.tipoForm = 'N';
    }
  }

  getUnidadesMedida(): void {
    this.unidadMedidaSvc.getUnidadesMedida().subscribe((data) => {
      this.unidades_medida = data;
    });
  }

  getProveedores(): void {
    this.proveedorSvc.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  getEstatus(): void {
    this.statusSvc.getEstatus().subscribe((data) => {
      this.estatus = data;
    });
  }

  onSubmit(): void {
    switch (this.tipoForm) {
      case 'N':
        this.agregar();
        break;
      case 'E':
        this.editar();
        break;
      default:
        break;
    }
  }

  onSelectFile(event: any) {
    const file: File[] = event.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      this.materiaPrimaForm.get('foto')?.setValue(e.target.result);
    };
    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  agregar(): void {
    let {
      codigo,
      nombre,
      descripcion,
      perecedero,
      stock,
      cant_minima,
      cant_maxima,
      unidad_medida,
      precio,
      foto,
      proveedor,
      idStatus,
    } = this.materiaPrimaForm.value;

    let fechaRegistro = new Date();
    let fechaModificacion = new Date();

    const materiaPrima: MateriaPrima = {
      codigo,
      nombre,
      descripcion,
      perecedero,
      stock,
      cant_minima,
      cant_maxima,
      unidad_medida: unidad_medida.idUnidadMedida,
      precio,
      foto,
      proveedor: proveedor.idProveedor,
      idStatus: idStatus ? idStatus : 1,
      fechaModificacion: fechaModificacion,
      fechaRegistro: fechaRegistro,
    };
    console.log(materiaPrima);
    this.materiaPrimaSvc.createMateriaPrima(materiaPrima).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Materia prima agregrada',
          detail: `La materia prima ${data.nombre} ha sido agregada correctamente`,
        });
        this.router.navigate(['admin', 'inventario', 'materiaprimas']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al agregar materia prima',
          detail: err.error.message,
        });
      }
    );
  }

  editar(): void {
    let {
      codigo,
      nombre,
      descripcion,
      perecedero,
      stock,
      cant_minima,
      cant_maxima,
      unidad_medida,
      precio,
      foto,
      proveedor,
      idStatus,
    } = this.materiaPrimaForm.value;

    let fechaModificacion = new Date();

    const materiaPrima: MateriaPrima = {
      codigo,
      nombre,
      descripcion,
      perecedero,
      stock,
      cant_minima,
      cant_maxima,
      unidad_medida: unidad_medida.idUnidadMedida,
      precio,
      foto,
      proveedor: proveedor.idProveedor,
      idStatus: idStatus ? idStatus : 1,
      fechaModificacion: fechaModificacion,
      fechaRegistro: this.materiaPrima.fechaRegistro,
    };

    console.log(materiaPrima);

    this.materiaPrimaSvc.updateMateriaPrima(materiaPrima).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Materia prima actualizado',
          detail: `La materia prima ${materiaPrima.nombre} ha sido actualizada correctamente`,
        });
        this.router.navigate(['admin', 'inventario', 'materiasprimas']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: `La materia prima ${materiaPrima.nombre} no se pudo actualizar`,
        });
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['admin', 'inventario', 'materiasprimas']);
  }
}
