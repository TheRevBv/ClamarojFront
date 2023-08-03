import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
      idStatus: [''],
      roles: new FormControl<Rol[] | null>(null),
      // roles: [''],
    });
    // this.usuarioForm.addControl('roles', new FormControl<Rol[] | null>(null));
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
          password: this.usuario.password,
          password_confirmation: this.usuario.password,
          foto: this.usuario.foto,
          fechaNacimiento: new Date(this.usuario.fechaNacimiento!),
          idStatus: this.usuario.idStatus,
          // roles: this.usuario.roles,
        });
      });
      console.log(this.usuarioForm);
      this.usuarioForm.get('correo')?.disable();
      this.usuarioForm.get('idStatus')?.disable();
    } else {
      this.title = 'Nuevo usuario';
      this.tipoForm = 'N';
    }
  }

  onSubmit(): void {
    console.log('submit');
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
    // this.usuario = this.usuarioForm.value;
    // this.usuariosSvc.addUsuario(this.usuario).subscribe((data) => {
    //   this.messageSvc.add({
    //     severity: 'success',
    //     summary: 'Usuario agregado',
    //     detail: `El usuario ${data.nombre} ${data.apellido} ha sido agregado correctamente`,
    //   });
    //   this.router.navigate(['/usuarios']);
    // });
  }

  editar(): void {
    // this.usuario = this.usuarioForm.value;
    // this.usuario.id = this.route.snapshot.params.id;
    // this.usuariosSvc.editUsuario(this.usuario).subscribe((data) => {
    //   this.messageSvc.add({
    //     severity: 'success',
    //     summary: 'Usuario editado',
    //     detail: `El usuario ${data.nombre} ${data.apellido} ha sido editado correctamente`,
    //   });
    //   this.router.navigate(['/usuarios']);
    // });
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
