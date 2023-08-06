import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { UsuariosService } from '@services/usuarios.service';
import { Estatus } from '@models/estatus';
import { Usuario } from '@models/usuarios';
import { Rol } from '@models/rol';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
  providers: [MessageService],
})
export class UsuariosFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  title: string = '';
  tipoForm: string = '';
  roles: Rol[] = [];
  estatus: Estatus[] = [];
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    idStatus: 0,
    roles: [],
    foto: '',
    fechaNacimiento: new Date(),
    fechaRegistro: new Date(),
  };
  maxDate!: Date;
  minDate: Date = new Date(1900, 0, 1);

  constructor(
    private route: ActivatedRoute,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private router: Router,
    private usuariosSvc: UsuariosService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      password: [''],
      password_confirmation: [''],
      foto: [''],
      fechaNacimiento: new Date(1900, 0, 1),
      // fechaRegistro: [''],
      idStatus: new FormControl<Estatus | null>(null),
      roles: new FormControl<Rol[] | null>(null),
    });
    this.statusSvc.getEstatus().subscribe((data) => {
      this.estatus = data;
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.getRoles();
    // this.getEstatus();
    // this.getUsuario();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.title = `Editar usuario ${id}`;
      this.tipoForm = 'E';
      this.usuariosSvc.getUsuario(+id).subscribe((data) => {
        console.log(data);
        this.usuario = data;
        this.usuarioForm.patchValue({
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          correo: this.usuario.correo,
          // password: this.usuario.password,
          // password_confirmation: this.usuario.password,
          foto: this.usuario.foto,
          fechaNacimiento: new Date(this.usuario.fechaNacimiento!),
          idStatus: this.usuario.idStatus,
          // roles: this.usuario.roles,
        });
      });
      // console.log(this.usuarioForm);
      // this.usuarioForm.get('correo')?.disable();
      // this.usuarioForm.get('idStatus')?.disable();
    } else {
      this.title = 'Nuevo usuario';
      this.tipoForm = 'N';
    }
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
      this.usuarioForm.get('foto')?.setValue(e.target.result);
    };
    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  agregar(): void {
    let {
      nombre,
      apellido,
      correo,
      password,
      idStatus,
      foto,
      fechaNacimiento,
      roles,
    } = this.usuarioForm.value;
    const usuario: Usuario = {
      nombre,
      apellido,
      correo: correo.toLowerCase(),
      password,
      foto,
      fechaNacimiento,
      idStatus: idStatus ? idStatus : 1,
      // roles: roles ? roles : [],
    };
    console.log(usuario);
    this.usuariosSvc.addUsuario(usuario).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Usuario agregado',
          detail: `El usuario ${data.nombre} ${data.apellido} ha sido agregado correctamente`,
        });
        this.router.navigate(['admin', 'usuarios']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al agregar usuario',
          detail: err.error.message,
        });
      }
    );
  }

  editar(): void {
    let {
      nombre,
      apellido,
      correo,
      password,
      foto,
      fechaNacimiento,
      idStatus,
    } = this.usuarioForm.value;
    const usuario: Usuario = {
      id: this.usuario.id,
      nombre,
      apellido,
      correo: correo.toLowerCase(),
      password: password === '' ? this.usuario.password : password,
      foto,
      fechaNacimiento,
      idStatus: idStatus ? idStatus.id : this.usuario.idStatus,
      // roles: this.usuario.roles,
      // fechaRegistro: this.usuario.fechaRegistro,
    };
    console.log(usuario);
    this.usuariosSvc.updateUsuario(usuario).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Usuario actualizado',
          detail: `El usuario ${usuario.nombre} ${usuario.apellido} ha sido actualizado correctamente`,
        });
        this.router.navigate(['admin', 'usuarios']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: `El usuario ${usuario.nombre} ${usuario.apellido} no se pudo actualizar`,
        });
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['admin', 'usuarios']);
  }
}
