import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Articulos } from '@models/articulos';
import { ToastrService } from 'ngx-toastr';
import { CarritoComponent } from '../carrito/carrito.component';
import { ClientesService } from '@services/clientes.service';

@Component({
  selector: 'app-prodet',
  templateUrl: './prodet.component.html',
  styleUrls: ['../../home.component.scss'],
})
export class ProdetComponent implements OnInit {
  public id: any;
  public user: any;
  list?: Articulos[];

  articulo: Articulos = {
    id: '',
    categoria: '',
    categoria_id: '',
    create_date: '',
    descripcion: '',
    imagen: '',
    nombre: '',
    precio: '',
    status: '',
    status_id: '',
    almacen: '',
    almacen_id: '',
    update_date: '',
  };

  constructor(
    private ApiService: ApiService,
    private toastr: ToastrService,
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
      this.ApiService.get(`api/articulos?id=${this.id}`).subscribe((item) => {
        if (!item.message) {
          this.articulo = item;
        } else {
          this.toastr.warning(item.message);
        }
      });

      this.ApiService.get('api/articulos').subscribe((item) => {
        let { data } = item;
        this.list = data;
      });
    } else {
      this.toastr.error('No se encontro el producto!');
      this.router.navigate(['home/products']);
    }
  }

  addCarrito() {
    let cliente = this.clienteSvc.getCliente(this.id);

    if (cliente) {
      console.log(cliente);

      let clientedate = cliente as any;
      let shopdata = {
        id: null,
        cliente_id: clientedate.id,
        articulo_id: this.articulo.id,
      };

      console.log(shopdata);

      this.ApiService.post(`api/carrito`, shopdata).subscribe((item) => {
        if (!item.message) {
          this.toastr.success('Se agrego al carrito');
        } else {
          this.toastr.warning(item.message);
        }
      });
    } else {
      this.toastr.error('Es necesario iniciar sesión');
      this.router.navigate([`home/singin`]);
    }
  }

  showArticulo(id: any) {
    this.router.navigate([`home/products/show/${id}`]);
  }
}
