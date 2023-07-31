import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@models/clientes';
import { Estatus } from '@models/estatus';
import { ClientesService } from '@services/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
  providers: [MessageService],
})
export class ClientesFormComponent implements OnInit {
  clienteForm!: FormGroup;
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
      fechaNacimiento: new Date(),
      fechaRegistro: new Date(),
      idStatus: 0,
    },
  };
  estatus: Estatus[] = [];
  minDate: Date = new Date('1900-01-01');
  maxDate!: Date;
  patternRFC: string = '^([A-ZÑ&]{3,4})\\d{6}([A-V1-9][A-Z1-9])?$';

  constructor(
    private clienteSvc: ClientesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageSvc: MessageService
  ) {
    this.clienteForm = this.fb.group({
      // idCliente: [0],
      nombre: [''],
      apellido: [''],
      correo: [''],
      password: [''],
      telefono: [''],
      direccion: [''],
      foto: [''],
      rfc: [''],
      idStatus: [''],
      fechaNacimiento: [''],
      // fechaRegistro: [''],
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = `Editar cliente ${id}`;
    } else {
      this.title = 'Agregar cliente';
    }
  }

  onSelectFile(event: any) {
    const file: File[] = event.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      // console.log(e.target.result);
      this.clienteForm.get('foto')?.setValue(e.target.result);
      console.log(this.clienteForm.get('foto')?.value);
    };
    console.log(this.clienteForm.get('foto')?.value);
    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  onSubmit() {
    console.log('submit');
    // console.log(this.clienteForm.value);
    this.agregar();
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
      // fechaRegistro,
    } = this.clienteForm.value;
    let telefonoStr: string = telefono
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim();
    let fechaRegistro = new Date();
    idStatus = 1;
    let rfcStr: string = rfc.toString().trim().toUpperCase();

    const cliente: Cliente = {
      // idCliente: 0,
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
        console.log(res);
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
}
