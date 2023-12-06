import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Carrito } from '@models/Carrito';
import { Cliente } from '@models/clientes';
import { Usuario } from '@models/usuarios';
import { ApiService } from '@services/api.service';
import { ClientesService } from '@services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  //   templateUrl: './carrito.component.html',
  template: '',
  styleUrls: ['../../home.component.scss'],
})
export class CarritoComponent implements OnInit {
  @Input() carrito: Carrito[] = [];
  userLog: boolean = false;
  user: Usuario | null = null;
  cliente: Cliente = {
    idCliente: 0,
    telefono: '',
    direccion: '',
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      fechaNacimiento: new Date(1900, 0, 1),
      idStatus: 0,
      foto: '',
    },
  };

  constructor(
    private clienteService: ClientesService,
    private api: ApiService,
    private toastr: ToastrService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.clienteService.getProfile().then((r) => r);
    this.userLog = this.clienteService.cliente ? true : false;
    this.user = this.clienteService.cliente;
    this.clienteService.getClienteByUsuario(this.user?.id!).subscribe((res) => {
      this.cliente = res;
    });
    if (this.userLog) {
      this.getCarritoList();
    }
  }

  getCarritoList() {
    this.api
      .get(`api/Carritos/cliente/${this.cliente.idCliente}`)
      .subscribe((item) => {
        let { data } = item;
        this.carrito = data;
      });
  }

  logouth() {
    localStorage.removeItem('access_token_cliente');
    localStorage.removeItem('cliente');
    this.userLog = false;
  }
}
