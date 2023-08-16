import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Carrito } from '@models/Carrito';
import { Cliente } from '@models/clientes';
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
  cliente = {
    id: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    status: 1,
  };

  constructor(
    private clienteService: ClientesService,
    private api: ApiService,
    private toastr: ToastrService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    /*this.clienteService.getProfile().then((r) => r);
    let data = JSON.parse(this.clienteService.cliente);
    if (!data) {
      this.userLog = false;
    } else {
      this.userLog = true;
      this.cliente = data;
      this.getCarritoList();
    }*/
  }

  getCarritoList() {
    this.api.get(`api/carrito?cliente=${this.cliente.id}`).subscribe((item) => {
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
