import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@services/usuarios.service';
import { MessageService } from 'primeng/api';
import { Login } from '@models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  login: Login = {
    correo: '',
    password: '',
  };

  loginForm!: FormGroup;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioSvc: UsuariosService,
    private router: Router,
    private messageSvc: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
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
        console.log(res);
        localStorage.setItem('access_token', res.token);
        // localStorage.setItem('refresh_token', '');
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/admin/dashboard']);
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
        this.messageSvc.add({
          severity: 'success',
          summary: 'Bienvenido a Clamaroj',
          detail: `Hola ${this.login.correo}`,
        });
      }
    );
  }
}
