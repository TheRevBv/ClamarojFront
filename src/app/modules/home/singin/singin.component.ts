import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { AppService } from '@services/app.service';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { ClientesService } from '@services/clientes.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['../home.component.scss'],
})
export class SinginComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /*public cliente: any = {
    email: '',
    password: ''
  }

  public loginForm: UntypedFormGroup;
  public isAuthLoading = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService,
    private renderer: Renderer2,
    private clienteService: ClientesService
  ) { }

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
  }

  async loginByAuth(e) {
    if (e.form.status === 'VALID') {
      this.api.data = this.loginForm;
      this.api.uri = 'api/clientes/login';
      //CREATE
      this.api.post(this.cliente).then((response) => {
        if (!response.message) {
          this.toastr.success('Ingresado correctamente!');
          localStorage.setItem('access_token', JSON.stringify(response.access_token));
          this.router.navigate(['home/products']).then(() => {
            // Recarga la página después de la redirección
            window.location.reload();
          });
      
        } else {
          this.toastr.warning(response.message);
        }
      });

    } else {
      this.toastr.error('Ingresa bien los datos!');
    }
  }

  async loginByAuthCliente() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            this.clienteService.data = this.loginForm;
            this.clienteService.uri = 'api/clientes/login';
            await this.clienteService.loginAuthCliente(this.loginForm.value).then((res) => {
                console.log(res);
                if (res.status === 200) {

                } else {
                    this.toastr.error('Usuario o contraseña incorrectos!');
                }
            });
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Formulario no valido!');
        }
    }

  ngOnDestroy() {
    // this.renderer.removeClass(
    //   document.querySelector('app-root'),
    //   'login-page'
    // );
  }*/
}
