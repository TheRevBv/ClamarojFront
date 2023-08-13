import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
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
    cantMaxima: 0,
    cantMinima: 0,
    foto: '',
    stock: 0,
    perecedero: 0,
    precio: 0,
    idUnidadMedida: 0,
    idProveedor: 0,
    idStatus: 0,
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private materiasPrimasSvc: MateriasPrimasService,
    private proveedoresSvc: ProveedoresService,
    private estatusSvc: EstatusService,
    private unidadMedidaSvc: UnidadMedidaService,
    private messageSvc: MessageService,
    private router: Router
  ) {
    this.createForm();
    this.getUnidadesMedida();
    this.getProveedores();
    this.getEstatus();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Editar materia prima #' + id;
      this.tipoForm = 'E';
      this.getMateriaPrima(id);
    } else {
      this.title = 'Registrar materia prima';
      this.tipoForm = 'N';
    }
  }

  getMateriaPrima(id: string) {
    this.materiasPrimasSvc.getMateriaPrima(+id).subscribe((res) => {
      this.materiaPrima = res;
      // console.log(this.materiaPrima);
      this.materiaPrimaForm.patchValue(this.materiaPrima);
    });
  }

  getUnidadesMedida() {
    this.unidadMedidaSvc.getUnidadesMedida().subscribe((res) => {
      this.unidades_medida = res;
    });
  }

  getProveedores() {
    this.proveedoresSvc.getProveedores().subscribe((res) => {
      this.proveedores = res;
    });
  }

  getEstatus() {
    this.estatusSvc.getEstatus().subscribe((res) => {
      this.estatus = res;
    });
  }

  createForm() {
    this.materiaPrimaForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantMinima: ['', Validators.required], //cantMinima:
      cantMaxima: ['', Validators.required], //cantMaxima:
      foto: [''],
      perecedero: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      idUnidadMedida: new FormControl<UnidadMedida | null>(null),
      idProveedor: new FormControl<Proveedor | null>(null),
      idStatus: new FormControl<Estatus | null>(null),
    });
  }

  onSubmit() {
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

  agregar() {
    let {
      codigo,
      nombre,
      descripcion,
      cantMinima,
      cantMaxima,
      foto,
      perecedero,
      precio,
      stock,
      idUnidadMedida,
      idProveedor,
      idStatus,
    } = this.materiaPrimaForm.value;

    this.materiaPrima = {
      id: 0,
      codigo,
      nombre,
      descripcion,
      cantMinima,
      cantMaxima,
      foto,
      perecedero,
      precio,
      stock,
      idStatus: idStatus,
      idUnidadMedida: idUnidadMedida,
      idProveedor: idProveedor,
    };

    this.materiasPrimasSvc.createMateriaPrima(this.materiaPrima).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: 'Materia prima agregada correctamente',
        });
        this.router.navigate(['admin', 'inventario', 'materias-primas']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editar() {
    let {
      codigo,
      nombre,
      descripcion,
      cantMinima,
      cantMaxima,
      foto,
      perecedero,
      precio,
      stock,
      idUnidadMedida,
      idProveedor,
      idStatus,
    } = this.materiaPrimaForm.value;

    this.materiaPrima = {
      id: this.materiaPrima.id,
      codigo,
      nombre,
      descripcion,
      cantMinima,
      cantMaxima,
      foto,
      perecedero,
      precio,
      stock,
      idStatus: idStatus ? idStatus : this.materiaPrima.idStatus,
      idUnidadMedida: idUnidadMedida
        ? idUnidadMedida
        : this.materiaPrima.idUnidadMedida,
      idProveedor: idProveedor ? idProveedor : this.materiaPrima.idProveedor,
    };

    this.materiasPrimasSvc.updateMateriaPrima(this.materiaPrima).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: 'Materia prima editada correctamente',
        });
        this.router.navigate(['admin', 'inventario', 'materias-primas']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancelar() {
    this.router.navigate(['admin', 'inventario', 'materias-primas']);
  }
}
