import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { EstatusService } from '@services/estatus.service';
import { UsuariosService } from '@services/usuarios.service';
import { Estatus } from '@models/estatus';
import { Usuario } from '@models/usuarios';
import { Rol } from '@models/rol';
import { RolesService } from '@services/roles.service';

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
    private rolesSvc: RolesService,
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
    this.getRoles();
    this.getEstatus();
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
        this.usuario = data;
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          // password: data.password,
          // password_confirmation: data.password,
          foto: data.foto,
          fechaNacimiento: new Date(data.fechaNacimiento!),
          idStatus: data.idEstatus,
          // rols: data.roles?.map((rol) => rol.id),
          roles: this.getRolesIds(data.roles!),
        });
      });
      // console.log(this.usuarioForm.value);
      // this.usuarioForm.get('correo')?.disable();
      // this.usuarioForm.get('idStatus')?.disable();
    } else {
      this.title = 'Nuevo usuario';
      this.tipoForm = 'N';
    }
  }

  getRoles(): void {
    this.rolesSvc.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  getEstatus(): void {
    this.statusSvc.getEstatus().subscribe((data) => {
      this.estatus = data;
    });
  }

  //Convertir arreglo de roles a arreglo de numeros
  getRolesIds(roles: Rol[]): number[] {
    let rolesIds: number[] = [];
    roles.forEach((rol) => {
      rolesIds.push(rol.id);
    });
    return rolesIds;
  }

  //Convertir arreglo de numeros a arreglo de roles
  getRolesFromIds(rolesIds: number[]): Rol[] {
    let roles: Rol[] = [];
    rolesIds.forEach((rolId) => {
      let rol = this.roles.find((rol) => rol.id === rolId);
      if (rol) {
        roles.push(rol);
      }
    });
    return roles;
  }

  onSubmit(): void {
    // console.log(this.usuarioForm.value);
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
      roles: roles ? this.getRolesFromIds(roles) : [],
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
      roles,
    } = this.usuarioForm.value;
    const usuario: Usuario = {
      id: this.usuario.id,
      nombre,
      apellido,
      correo: correo.toLowerCase(),
      password: password === '' ? this.usuario.password : password,
      foto,
      fechaNacimiento,
      idStatus: idStatus ? idStatus : this.usuario.idStatus,
      roles: roles ? this.getRolesFromIds(roles) : [],
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
