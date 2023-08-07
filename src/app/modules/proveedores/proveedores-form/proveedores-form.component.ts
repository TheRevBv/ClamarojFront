import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { EstatusService } from '@services/estatus.service';
import { ProveedoresService } from '@services/proveedores.service';

import { Proveedor } from '@models/proveedores';
import { Estatus } from '@models/estatus';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css'],
  providers: [MessageService],
})
export class ProveedoresFormComponent implements OnInit {
  proveedorForm!: FormGroup;
  tipoForm: string = '';
  title = '';
  proveedor: Proveedor = {
    idProveedor: 0,
    razonSocial: '',
    direccion: '',
    telefono: '',
    rfc: '',
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      foto: '',
      fechaNacimiento: new Date(1900, 0, 1),
      fechaRegistro: new Date(),
      idStatus: 0,
    },
  };
  estatus: Estatus[] = [];
  minDate: Date = new Date('1900-01-01');
  maxDate!: Date;
  // El rfc debe tener 13 caracteres
  // Los primeros 4 caracteres deben ser letras mayúsculas
  // Los siguientes 6 caracteres deben ser números
  // Los últimos 3 caracteres pueden ser letras mayúsculas o números
  patternRFC: string = '^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$';

  constructor(
    private route: ActivatedRoute,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private proveedorSvc: ProveedoresService,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      password: [''],
      fechaNacimiento: new Date(1900, 0, 1),
      idStatus: new FormControl<Estatus | null>(null),
      razonSocial: [''],
      direccion: [''],
      telefono: [''],
      rfc: [''],
      foto: [''],
    });
    this.statusSvc.getEstatus().subscribe((estatus) => {
      this.estatus = estatus;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.tipoForm = 'E';
        this.title = `Editar Proveedor ${id}`;
        this.proveedorSvc.getProveedor(+id).subscribe((proveedor) => {
          console.log(proveedor);
          this.proveedor = proveedor;
          this.proveedorForm.patchValue({
            nombre: this.proveedor.usuario.nombre,
            apellido: this.proveedor.usuario.apellido,
            correo: this.proveedor.usuario.correo.toLowerCase(),
            // password: this.proveedor.usuario.password,
            fechaNacimiento: new Date(this.proveedor.usuario.fechaNacimiento!),
            idStatus: this.proveedor.usuario.idStatus,
            razonSocial: this.proveedor.razonSocial,
            direccion: this.proveedor.direccion,
            telefono: this.proveedor.telefono,
            rfc: this.proveedor.rfc.toUpperCase(),
            foto: this.proveedor.usuario.foto,
          });
        });
      } else {
        this.tipoForm = 'A';
        this.title = 'Agregar Proveedor';
      }
    });
  }

  onSelectFile(event: any) {
    const file: File[] = event.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      this.proveedorForm.get('foto')?.setValue(e.target.result);
    };
    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  onSubmit(): void {
    switch (this.tipoForm) {
      case 'A':
        this.agregar();
        break;
      case 'E':
        this.editar();
        break;
      default:
        break;
    }
  }

  cancelar(): void {
    this.router.navigate(['admin', 'proveedores']);
  }

  agregar(): void {
    // console.log(this.proveedorForm.value);
    let {
      nombre,
      apellido,
      correo,
      password,
      fechaNacimiento,
      idStatus,
      razonSocial,
      direccion,
      telefono,
      rfc,
      foto,
    } = this.proveedorForm.value;
    let telefonoStr: string = telefono
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim();
    let rfcStr: string = rfc.toString().trim().toUpperCase();
    const proveedor: Proveedor = {
      idProveedor: 0,
      razonSocial: razonSocial.toString().trim(),
      direccion: direccion.toString().trim(),
      telefono: telefonoStr,
      rfc: rfcStr,
      usuario: {
        id: 0,
        nombre: nombre.toString().trim(),
        apellido: apellido.toString().trim(),
        correo: correo.toString().trim().toLowerCase(),
        password,
        foto,
        fechaNacimiento,
        fechaRegistro: new Date(),
        idStatus: idStatus,
      },
    };
    console.log(proveedor);
    this.proveedorSvc.addProveedor(proveedor).subscribe(
      (res) => {
        // console.log(proveedor);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Proveedor agregado',
          detail: `Proveedor ${proveedor.usuario.nombre} agregado correctamente`,
        });
        this.router.navigate(['admin', 'proveedores']);
      },
      (error) => {
        console.log(error);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar el proveedor',
        });
      }
    );
  }

  editar(): void {
    // console.log(this.proveedorForm.value);
    let {
      nombre,
      apellido,
      correo,
      password,
      fechaNacimiento,
      idStatus,
      razonSocial,
      direccion,
      telefono,
      rfc,
      foto,
    } = this.proveedorForm.value;
    let telefonoStr: string = telefono
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim();
    let rfcStr: string = rfc.toString().trim().toUpperCase();

    const proveedor: Proveedor = {
      idProveedor: this.proveedor.idProveedor,
      razonSocial: razonSocial.toString().trim(),
      direccion: direccion.toString().trim(),
      telefono: telefonoStr,
      rfc: rfcStr,
      usuario: {
        id: this.proveedor.usuario.id,
        nombre: nombre.toString().trim(),
        apellido: apellido.toString().trim(),
        correo: correo.toString().trim().toLowerCase(),
        password: password === '' ? this.proveedor.usuario.password : password,
        foto,
        fechaNacimiento: fechaNacimiento,
        fechaRegistro: new Date(),
        idStatus: idStatus ? idStatus : this.proveedor.usuario.idStatus,
      },
    };
    console.log(proveedor);
    this.proveedorSvc.updateProveedor(proveedor).subscribe(
      (res) => {
        // console.log(proveedor);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Proveedor actualizado',
          detail: `Proveedor ${proveedor.usuario.nombre} actualizado correctamente`,
        });
        this.router.navigate(['admin', 'proveedores']);
      },
      (error) => {
        console.log(error);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el proveedor',
        });
      }
    );
  }
}
