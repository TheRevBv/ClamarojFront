import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Articulos } from '@models/articulos';
// import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CarritoComponent } from '../carrito/carrito.component';
import { ClientesService } from '@services/clientes.service';
import { Cliente } from '@models/clientes';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@models/productos';
import { Usuario } from '@models/usuarios';
import { CarritosService } from '@services/carritos.service';

@Component({
  selector: 'app-prodet',
  templateUrl: './prodet.component.html',
  styleUrls: ['../../home.component.scss'],
  providers: [MessageService],
})
export class ProdetComponent implements OnInit {
  id: any;
  usuarioCliente: Usuario | null = null;
  cliente: any = {
    idCliente: 0,
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: new Date(),
    foto: '',
    idStatus: 0,
    rfc: '',
    direccion: '',
    telefono: '',
  };
  productos: Producto[] = [];
  producto: Producto = {
    idProducto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    codigo: '',
    merma: 0,
    foto: '',
    idStatus: 0,
    fechaRegistro: new Date(),
    fechaModificacion: new Date(),
  };

  constructor(
    // private ApiService: ApiService,
    private carritosSvc: CarritosService,
    // private toastr: ToastrService,
    private messageSvc: MessageService,
    private productosSvc: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteSvc: ClientesService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArticulos();
    this.usuarioCliente = this.clienteSvc.cliente;
    if (this.usuarioCliente) {
      this.getCliente();
    }
  }

  getArticulos() {
    if (parseInt(this.id) && parseInt(this.id) > 0) {
      this.id = parseInt(this.id);
      this.productosSvc.getProducto(this.id).subscribe((res) => {
        this.producto = res;
      });
    } else {
      this.productosSvc.getProductos().subscribe((res) => {
        this.productos = res;
      });
    }
  }

  getCliente() {
    this.clienteSvc
      .getClienteByUsuario(this.usuarioCliente?.id!)
      .subscribe((res) => {
        this.cliente = res;
        console.log(this.cliente);
      });
  }

  addCarrito() {
    if (
      this.usuarioCliente === null ||
      this.usuarioCliente === undefined ||
      this.cliente === null ||
      this.cliente === undefined
    ) {
      this.messageSvc.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Es necesario iniciar sesión',
      });
      this.router.navigate([`inicio/singin`]);
      return;
    }
    let carrito = {
      idCarrito: 0,
      idCliente: this.cliente.idCliente,
      idProducto: this.producto.idProducto,
      cantidad: 1,
    };

    this.carritosSvc.addCarrito(carrito).subscribe(
      (res) => {
        console.log(res);
        this.messageSvc.add({
          severity: 'success',
          summary: 'Agregado',
          detail: 'Producto agregado al carrito',
        });
        this.router.navigate([`inicio/shopping-cart`]);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar producto al carrito',
        });
      }
    );
  }

  showArticulo(id: any) {
    this.router.navigate([`inicio/products/show/${id}`]);
    this.productosSvc.getProducto(id).subscribe((res) => {
      this.producto = res;
    });
  }

  getArticulosCarrito() {
    this.carritosSvc
      .getCarritosCliente(this.cliente?.idCliente!)
      .subscribe((res) => {
        this.productos = res;
      });
  }
}
