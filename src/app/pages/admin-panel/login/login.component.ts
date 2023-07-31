import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuariosService } from '@services/usuarios.service';
import { Login } from '@models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: Login = {
    correo: '',
    password: '',
  };

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioSvc: UsuariosService,
    private toastr: ToastrService,
    private router: Router
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
        this.toastr.success(
          `Bienvenido ${res.usuario.nombre}`,
          'Login exitoso'
        );
        this.router.navigate(['/admin/dashboard']).then((r) => r);
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error, 'Error al iniciar sesión');
      }
    );
  }
}
