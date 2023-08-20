import { Component, OnInit } from '@angular/core';
import { Carrito } from '@models/Carrito';
import { Ventas } from '@models/ventas';
// import { Cliente } from '@models/clientes';
import { ApiService } from '@services/api.service';
import { ClientesService } from '@services/clientes.service';
import { Router } from '@angular/router';
import { Cliente } from '@models/clientes';
import { MessageService } from 'primeng/api';
import { Pedido } from '@models/pedidos';
import { DetallePedido } from '@models/detallepedidos';
import { PedidosService } from '@services/pedidos.service';
import { CarritosService } from '@services/carritos.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  template: '',
  styleUrls: ['../home.component.scss'],
  providers: [MessageService],
})
export class ShoppingCartComponent implements OnInit {
  userLog: boolean = false;
  carrito: any = [];
  cliente: Cliente = {
    idCliente: 1,
    direccion: '',
    telefono: '',
    rfc: '',
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      foto: '',
      fechaNacimiento: new Date(1900, 0, 1),
      fechaRegistro: new Date(),
      idStatus: 0,
    },
  };

  pedido: Pedido = {
    idPedido: 0,
    idUsuario: 0,
    idStatus: 0,
    fecha: new Date(),
    fechaEntrega: new Date(),
    domicilio: '',
    telefono: '',
    razonSocial: '',
    rfc: '',
    tipoPago: '',
    tipoEnvio: '',
    tipoPedido: '',
    total: 0,
    detallesPedidos: [],
  };

  detallesPedido: DetallePedido[] = [];

  venta: Ventas = {
    id: 0,
    cliente_id: this.cliente.idCliente,
    total: 0,
    subtotal: 0,
    iva: 0,
    status: '1',
    nota: '',
  };

  constructor(
    private clienteSvc: ClientesService,
    private api: ApiService,
    private carritoSvc: CarritosService,
    private messageSvc: MessageService,
    private pedidosSvc: PedidosService,
    private router: Router
  ) {
    // let data = ClienteService.getCliente();
    let idCliente = 1;
    this.clienteSvc.getCliente(idCliente).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }
  ngOnInit(): void {
    this.getCarritoList();
  }

  // getCarritoList() {
  //   this.api
  //     .get(`api/Carritos/cliente/${this.cliente.idCliente}`)
  //     .subscribe((item) => {
  //       this.carrito = item;
  //       this.sumProducts();
  //     });
  // }

  getCarritoList() {
    this.carritoSvc
      .getCarritosCliente(this.cliente.idCliente)
      .subscribe((item) => {
        this.carrito = item;
        this.sumProducts();
      });
  }

  sumCantidadProducto(event: any, data: any) {
    console.log(data);
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].idCarrito === data.idCarrito) {
        this.carrito[i].cantidad = this.carrito[i].cantidad + 1;
        this.carrito[i].total =
          this.carrito[i].cantidad * this.carrito[i].precio;
        this.sumProducts();
        break; // Salir del bucle una vez que se encuentre el objeto a modificar
      }
    }
    this.sumProducts();
  }

  restarCantidadProducto(event: any, data: any) {
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
      let total = this.carrito[i].cantidad * this.carrito[i].precio;
      this.venta.subtotal += total;
      this.venta.iva = this.venta.subtotal * 0.16;
      this.venta.total = this.venta.subtotal + this.venta.iva;
    }
  }

  guardarVenta() {
    this.detallesPedido = [];
    this.venta.cliente_id = this.cliente.idCliente;
    if (this.carrito.length == 0) {
      this.messageSvc.add({
        severity: 'warn',
        summary: 'Es necesario agregar productos al carrito',
        detail: '',
      });
    } else {
      let fechaActual = new Date();

      //insert detalle pedido
      for (let i = 0; i < this.carrito.length; i++) {
        this.detallesPedido.push({
          idDetallePedido: 0,
          idPedido: 0,
          fecha: new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            fechaActual.getDate()
          ),
          idProducto: this.carrito[i].idProducto,
          cantidad: this.carrito[i].cantidad,
          precioUnitario: this.carrito[i].precio,
          subtotal: this.carrito[i].cantidad * this.carrito[i].precio,
        });
      }
      //insert pedido

      this.pedido = {
        idPedido: 0,
        idUsuario: this.cliente.idCliente,
        idStatus: 1,
        fecha: new Date(
          fechaActual.getFullYear(),
          fechaActual.getMonth(),
          fechaActual.getDate()
        ),
        fechaEntrega: new Date(),
        domicilio: this.cliente.direccion ?? '',
        telefono: this.cliente.direccion ?? '',
        razonSocial: '',
        rfc: this.cliente.rfc ?? '',
        tipoPago: '1',
        tipoEnvio: '1',
        tipoPedido: '1',
        total: this.venta.total,
        detallesPedidos: this.detallesPedido,
      };

      console.log(this.pedido);
      this.pedidosSvc.addPedido(this.pedido).subscribe(
        (data) => {
          console.log(data);

          this.messageSvc.add({
            severity: 'success',
            summary: '¡Correcto!',
            detail: `Pedido agregado correctamente`,
          });
          this.router.navigate(['home', 'shopping-cart']);
        },
        (err) => {
          this.messageSvc.add({
            severity: 'error',
            summary: '¡Error!',
            detail: `Error al agregar el pedido`,
          });
        }
      );
      //
      /*this.api.post(`api/Ventas`, this.venta).subscribe((item) => {
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
                this.deleteCart(this.cliente.idCliente);
                this.router.navigate([
                  `home/shopping-cart/pago/${item.venta_id}`,
                ]);
              } else {
                this.messageSvc.add({
                  severity: 'warn',
                  summary: item.message,
                  detail: '',
                });
              }
            });
          }
        } else {
          this.messageSvc.add({
            severity: 'warn',
            summary: item.message,
            detail: '',
          });
        }
      });*/
    }
  }

  deleteProductCart(event: any, id: any) {
    let data = { id: id };
    this.api
      .delete(`api/Carrito/${id}`)
      .subscribe((item: { message: string | undefined }): void => {
        if (!item.message) {
          this.messageSvc.add({
            severity: 'success',
            summary: 'Se elimino del carrito',
            detail: '',
          });
          this.carrito = this.getCarritoList();
        } else {
          this.messageSvc.add({
            severity: 'warn',
            summary: item.message,
            detail: '',
          });
        }
      });
  }

  deleteCart(id: any) {
    let data = { cliente: id };
    this.api.delete(`api/Carrito`).subscribe((item) => {
      if (!item.message) {
        // this.toastr.error('Se elimino del carrito');
      } else {
        this.messageSvc.add({
          severity: 'warn',
          summary: item.message,
          detail: '',
        });
      }
    });
  }
}
