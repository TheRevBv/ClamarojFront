import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { ClientesService } from '@services/clientes.service';
import { Cliente } from '@models/clientes';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['../home.component.scss'],
})
export class SingupComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /* public signForm: UntypedFormGroup;
  public isAuthLoading = false;
  public addClient: UntypedFormGroup;

  cliente: Cliente = {
    id: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    status: 1
  };

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router,
    private clienteService: ClientesService
  ) { }

  ngOnInit() {
  }

  async sendData(e) {
    if (e.form.status === 'VALID') {
      this.api.data = this.signForm;
      this.api.uri = 'api/clientes';
      //CREATE
      this.api.post(this.cliente).then((response) => {
        console.log(response);

        if (response && !response.message) {
          this.toastr.success('Ingresado correctamente!');
          this.router.navigate(['/home/singin']);
        } else {
          console.log(response);
          this.toastr.warning(response.message);
        }
      });

    } else {
      this.toastr.error('Ingresa bien los datos!');
    }
  }

  async registerByAuthCliente(e) {
    if (e.form.status === 'VALID') {
      this.clienteService.data = this.signForm;
      this.clienteService.uri = 'api/clientes/register';
      //CREATE
        this.clienteService.registerAuthCliente(this.cliente).then((response) => {
        console.log(response);
        if (response.status === 200) {

        } else {
          console.log(response);
          this.toastr.warning(response.message);
        }
      });

    } else {
      this.toastr.error('Ingresa bien los datos!');
    }
  }*/
}
