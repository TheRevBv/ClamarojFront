import { Component, OnInit } from '@angular/core';
import { Carrito } from '@models/Carrito';
import { Ventas } from '@models/Ventas';
// import { Cliente } from '@models/clientes';
import { ApiService } from '@services/api.service';
import { ClientesService } from '@services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Cliente {
  id: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  status: number;
}

@Component({
  selector: 'app-shopping-cart',
  // templateUrl: './shopping-cart.component.html',
  template: '',
  styleUrls: ['../home.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  userLog: boolean = false;
  carrito: any = [];
  cliente: Cliente = {
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
  venta: Ventas = {
    id: 0,
    cliente_id: parseInt(this.cliente.id),
    total: 0,
    subtotal: 0,
    iva: 0,
    status: '1',
    nota: '',
  };

  constructor(
    ClienteService: ClientesService,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    /*let data = ClienteService.getCliente();
        if (!data) {
            this.userLog = false;
        } else {
            this.userLog = true;
            this.cliente = data;
        }*/
  }
  ngOnInit(): void {
    this.getCarritoList();
  }

  getCarritoList() {
    this.api.get(`api/carrito?cliente=${this.cliente.id}`).subscribe((item) => {
      let { data } = item;
      this.carrito = data;
      this.sumProducts();
    });
  }

  sumCantidadProducto(event: any, data: any) {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id === data.id) {
        this.carrito[i].cantidad = this.carrito[i].cantidad + 1;
        this.carrito[i].total =
          this.carrito[i].cantidad * this.carrito[i].precio;
        this.sumProducts();
        break; // Salir del bucle una vez que se encuentre el objeto a modificar
      }
    }
    this.sumProducts();
  }

  restarCantidadProducto({ event, data }: { event: any; data: any }) {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id === data.id) {
        if (this.carrito[i].cantidad - 1 == 0) return false;
        this.carrito[i].cantidad = this.carrito[i].cantidad - 1;
        this.carrito[i].total =
          this.carrito[i].cantidad * this.carrito[i].precio;
        break; // Salir del bucle una vez que se encuentre el objeto a modificar
      }
    }

    this.sumProducts();

    return true;
  }

  sumProducts() {
    this.venta.subtotal = 0;
    this.venta.iva = 0;
    this.venta.total = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      this.venta.subtotal += parseFloat(this.carrito[i].total);
      this.venta.iva = this.venta.subtotal * 0.16;
      this.venta.total = this.venta.subtotal + this.venta.iva;
    }
  }

  guardarVenta() {
    this.venta.cliente_id = parseInt(this.cliente.id);
    if (this.carrito.length == 0) {
      this.toastr.success('Es necesario agregar productos al carrito');
    } else {
      //insert venta
      this.api.post(`api/ventas`, this.venta).subscribe((item) => {
        if (!item.message) {
          // this.toastr.success('Se agrego al carrito');
          console.log(item.id);
          //insert venta detalle
          for (let i = 0; i < this.carrito.length; i++) {
            let venta_detalle = {
              id: null,
              venta_id: item.id,
              articulo: this.carrito[i].articulo_id,
              cantidad: this.carrito[i].cantidad,
              precio: this.carrito[i].precio,
              total: this.carrito[i].total,
            };

            this.api.post(`api/ventasdet`, venta_detalle).subscribe((item) => {
              if (!item.message) {
                // this.toastr.success('Se completo la venta');
                this.deleteCart(this.cliente.id);
                this.router.navigate([
                  `home/shopping-cart/pago/${item.venta_id}`,
                ]);
              } else {
                this.toastr.warning(item.message);
              }
            });
          }
        } else {
          this.toastr.warning(item.message);
        }
      });
    }
  }

  deleteProductCart(event: any, id: any) {
    let data = { id: id };
    /*this.api.delete(`api/carrito`).subscribe((item) => {
      if (!item.message) {
        this.toastr.error('Se elimino del carrito');
        this.carrito = this.getCarritoList();
      } else {
        this.toastr.warning(item.message);
      }
    });*/
  }

  deleteCart(id: any) {
    /*let data = { cliente: id };
    this.api.delete(`api/carrito`).then((item) => {
      if (!item.message) {
        // this.toastr.error('Se elimino del carrito');
      } else {
        this.toastr.warning(item.message);
      }
    });*/
  }
}
