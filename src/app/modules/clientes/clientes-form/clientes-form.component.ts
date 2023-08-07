import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { Cliente } from '@models/clientes';
import { Estatus } from '@models/estatus';
import { ClientesService } from '@services/clientes.service';
import { EstatusService } from '@services/estatus.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
  providers: [MessageService],
})
export class ClientesFormComponent implements OnInit {
  clienteForm!: FormGroup;
  tipoForm: string = '';
  title = '';
  cliente: Cliente = {
    idCliente: 0,
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
    private clienteSvc: ClientesService,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      password: [''],
      telefono: [''],
      direccion: [''],
      foto: [''],
      rfc: [''],
      idStatus: new FormControl<Estatus | null>(null),
      fechaNacimiento: new Date(1900, 0, 1),
    });
    this.statusSvc.getEstatus().subscribe((estatus) => {
      console.log(estatus);
      this.estatus = estatus;
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = `Editar cliente ${id}`;
      this.clienteSvc.getCliente(+id).subscribe((cliente) => {
        console.log(cliente);
        this.cliente = cliente;
        this.clienteForm.patchValue({
          nombre: this.cliente.usuario.nombre,
          apellido: this.cliente.usuario.apellido,
          correo: this.cliente.usuario.correo.toLowerCase(),
          // password: this.cliente.usuario.password,
          telefono: this.cliente.telefono,
          direccion: this.cliente.direccion,
          foto: this.cliente.usuario.foto,
          rfc: this.cliente.rfc?.toUpperCase(),
          idStatus: this.cliente.usuario.idStatus,
          fechaNacimiento: new Date(this.cliente.usuario.fechaNacimiento!),
        });
      });
      this.tipoForm = 'edit';
    } else {
      this.title = 'Agregar cliente';
      this.tipoForm = 'add';
    }
  }

  onSelectFile(event: any) {
    const file: File[] = event.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      this.clienteForm.get('foto')?.setValue(e.target.result);
    };
    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  onSubmit() {
    switch (this.tipoForm) {
      case 'add':
        this.agregar();
        break;
      case 'edit':
        this.editar();
        break;
      default:
        break;
    }
  }

  cancelar() {
    this.router.navigate(['admin', 'clientes']);
  }

  agregar() {
    let {
      nombre,
      apellido,
      correo,
      password,
      telefono,
      direccion,
      foto,
      rfc,
      idStatus,
      fechaNacimiento,
    } = this.clienteForm.value;
    let telefonoStr: string = telefono
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim();
    let fechaRegistro = new Date();
    let rfcStr: string = rfc.toString().trim().toUpperCase();

    const cliente: Cliente = {
      idCliente: 0,
      telefono: telefonoStr,
      direccion,
      rfc: rfcStr,
      usuario: {
        // id: 0,
        nombre,
        apellido,
        correo,
        password,
        foto,
        fechaNacimiento,
        fechaRegistro,
        idStatus,
      },
    };
    console.log(cliente);

    this.clienteSvc.addCliente(cliente).subscribe(
      (res) => {
        // console.log(res);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Cliente agregado',
          detail: '',
        });
        this.router.navigate(['admin', 'clientes']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al agregar cliente',
          detail: '',
        });
      }
    );
  }

  editar() {
    let {
      nombre,
      apellido,
      correo,
      password,
      telefono,
      direccion,
      foto,
      rfc,
      //TODO:AGREGAR SERVICIO DE ESTATUS
      idStatus,
      fechaNacimiento,
    } = this.clienteForm.value;
    let telefonoStr: string = telefono
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim();

    let rfcStr: string = rfc.toString().trim().toUpperCase();

    const cliente: Cliente = {
      idCliente: this.cliente.idCliente,
      telefono: telefonoStr,
      direccion,
      rfc: rfcStr,
      usuario: {
        id: this.cliente.usuario.id,
        nombre,
        apellido,
        correo: correo.toLowerCase(),
        password: password === '' ? this.cliente.usuario.password : password,
        foto,
        fechaNacimiento,
        idStatus: idStatus ? idStatus : this.cliente.usuario.idStatus,
      },
    };
    console.log(cliente);

    this.clienteSvc.updateCliente(cliente).subscribe(
      (res) => {
        // console.log(res);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Cliente editado',
          detail: '',
        });
        this.router.navigate(['admin', 'clientes']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al editar cliente',
          detail: '',
        });
      }
    );
  }
}
