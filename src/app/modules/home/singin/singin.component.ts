import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '@models/rol';
import { Login } from '@models/login';
import { UsuariosService } from '@services/usuarios.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['../home.component.scss'],
  providers: [MessageService],
})
export class SinginComponent implements OnInit {
  login: Login = {
    correo: '',
    password: '',
  };

  loginForm!: FormGroup;

  passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioSvc: UsuariosService,
    private router: Router,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordPattern),
        ],
      ],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.login = {
      correo: email,
      password,
    };
    this.onLogin(this.login);
  }

  onLogin(data: Login) {
    this.usuarioSvc.login(data).subscribe(
      (res) => {
        // console.log(res);
        let rol = res.usuario.roles.find(
          (rol: Rol) => rol.nombre === 'Proveedor'
        );
        if (!rol) {
          this.messageSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No tienes permisos para acceder a este portal',
          });
          return;
        }
        localStorage.setItem('access_token_proveedor', res.token);
        localStorage.setItem('proveedor', JSON.stringify(res.usuario));
        setTimeout(() => {
          this.messageSvc.add({
            severity: 'success',
            summary: 'Bienvenido al portal de proveedores de ClamaROJ',
            detail: `Hola ${this.login.correo}`,
          });
          this.router.navigate(['portal-proveedores']);
        }, 1000);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al iniciar sesión',
        });
      },
      () => {
        console.log('Petición completa');
        // this.messageSvc.add({
        //   severity: 'success',
        //   summary: 'Bienvenido al portal de proveedores de ClamaROJ',
        //   detail: `Hola ${this.login.correo}`,
        // });
      }
    );
  }
}
