import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Articulos } from '@models/articulos';
// import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CarritoComponent } from '../carrito/carrito.component';
import { ClientesService } from '@services/clientes.service';
import { Cliente } from '@models/clientes';

@Component({
  selector: 'app-prodet',
  templateUrl: './prodet.component.html',
  styleUrls: ['../../home.component.scss'],
  providers: [MessageService],
})
export class ProdetComponent implements OnInit {
  public id: any;
  public user: any;
  list?: Articulos[];

  articulo: Articulos = {
    codigo: '',
    descripcion: '',
    estatus: '',
    foto: '',
    idProducto: '',
    merma: '',
    nombre: '',
    precio: '',
  };

  constructor(
    private ApiService: ApiService,
    // private toastr: ToastrService,
    private messageSvc: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteSvc: ClientesService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArticulos();
  }

  getArticulos() {
    if (parseInt(this.id) && parseInt(this.id) > 0) {
      this.id = parseInt(this.id);
      this.ApiService.get(`api/Productos/${this.id}`).subscribe((item) => {
        if (!item.message) {
          this.articulo = item;
        } else {
          this.messageSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: item.message,
          });
          this.router.navigate(['home/products']);
        }
      });

      this.ApiService.get('api/Productos').subscribe((item) => {
        this.list = item;
      });
    } else {
      this.messageSvc.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El id no es valido',
      });
      this.router.navigate(['home/products']);
    }
  }

  addCarrito() {
    let data = {
      nombre: 'brian moreno',
      apellido: 'brian moreno',
    };

    localStorage.setItem('cliente', JSON.stringify(data));

    let usuarioCliente = this.clienteSvc.cliente!;
    let cliente: Cliente | null = null;
    this.clienteSvc
      .getClienteByEmail(usuarioCliente.correo)
      .subscribe((res) => {
        cliente = res;
      });
    console.log(cliente);

    if (cliente === null) {
      console.log(cliente);

      let clientedate = cliente as any;
      let shopdata = {
        idCarrito: 0,
        idCliente: 1, // clientedate.id,
        idProducto: this.articulo.idProducto,
        cantidad: 1,
      };

      console.log(shopdata);

      this.ApiService.post(`api/Carritos`, shopdata).subscribe((item) => {
        if (!item.message) {
          this.messageSvc.add({
            severity: 'success',
            summary: 'Carrito',
            detail: 'Se agrego al carrito',
          });
        } else {
          this.messageSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: item.message,
          });
        }
      });
    } else {
      alert('Es necesario iniciar sesión');
      this.router.navigate([`inicio/singin`]);
    }
  }

  showArticulo(id: any) {
    this.router.navigate([`inicio/products/show/${id}`]);
    this.ApiService.get(`api/Productos/${id}`).subscribe((item) => {
      if (!item.message) {
        this.articulo = item;
        window.scrollTo({ top: 250, behavior: 'smooth' });
      } else {
        alert(item.message);
      }
    });
  }

  getArticulosCarrito() {
    // uri Carritos/cliente/1
    let idCliente = 1;
    this.ApiService.get(`api/Carritos/cliente/${idCliente}`).subscribe(
      (item) => {
        if (!item.message) {
          this.articulo = item;
        } else {
          alert(item.message);
        }
      }
    );
  }
}
