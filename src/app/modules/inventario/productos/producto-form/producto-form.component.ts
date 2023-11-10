import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@models/productos';
import { Estatus } from '@models/estatus';
import { EstatusService } from '@services/estatus.service';
import { ProductosService } from '@services/productos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
  providers: [MessageService],
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;
  title = '';
  tipoForm: string = '';
  producto: Producto = {
    idProducto: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    foto: '',
    merma: 0,
    idStatus: 0,
    fechaRegistro: new Date(),
    fechaModificacion: new Date(),
  };
  estatus: Estatus[] = [];

  constructor(
    private route: ActivatedRoute,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private productoSvc: ProductosService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      codigo: [''],
      nombre: [''],
      descripcion: [''],
      precio: [''],
      foto: [''],
      merma: [''],
      idStatus: new FormControl<Estatus | null>(null),
    });
    this.getEstatus();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.title = `Editar producto ${id}`;
      this.productoSvc.getProducto(+id).subscribe((producto) => {
        // console.log(producto);
        this.producto = producto;
        this.productoForm.patchValue({
          codigo: this.producto.codigo,
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          precio: this.producto.precio,
          foto: this.producto.foto,
          merma: this.producto.merma,
          idStatus: this.producto.idStatus,
        });
      });
      this.tipoForm = 'edit';
    } else {
      this.title = 'Agregar producto';
      this.tipoForm = 'add';
    }
  }

  getEstatus(): void {
    this.statusSvc.getEstatus().subscribe((data) => {
      console.log(data);
      this.estatus = data;
    });
  }

  onSelectFile(event: any) {
    const file: File[] = event.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e: any) => {
      this.productoForm.get('foto')?.setValue(e.target.result);
    };

    this.messageSvc.add({
      severity: 'info',
      summary: 'Archivo seleccionado',
      detail: '',
    });
  }

  onSubmit() {
    switch (this.tipoForm) {
      case 'add':
        this.agregar();
        break;
      case 'edit':
        this.editar();
        break;
      default:
        break;
    }
  }

  cancelar() {
    this.router.navigate(['admin', 'inventario', 'productos']);
  }

  agregar() {
    let { codigo, nombre, descripcion, precio, foto, merma, idStatus } =
      this.productoForm.value;

    let fechaRegistro = new Date();
    let fechaModificacion = new Date();
    idStatus = 1;

    const producto: Producto = {
      idProducto: 0,
      codigo,
      nombre,
      descripcion,
      precio,
      foto,
      merma,
      idStatus,
      fechaRegistro,
      fechaModificacion,
    };
    console.log(producto);

    this.productoSvc.createProducto(producto).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Producto agregado',
          detail: '',
        });
        this.router.navigate(['admin', 'inventario', 'productos']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al agregar producto',
          detail: '',
        });
      }
    );
  }

  editar() {
    let { codigo, nombre, descripcion, precio, foto, merma, idStatus } =
      this.productoForm.value;

    let fechaModificacion = new Date();

    const producto: Producto = {
      idProducto: this.producto.idProducto,
      codigo,
      nombre,
      descripcion,
      precio,
      foto,
      merma,
      idStatus: this.producto.idStatus,
      fechaRegistro: this.producto.fechaRegistro,
      fechaModificacion,
    };

    console.log(producto);

    this.productoSvc.updateProducto(producto).subscribe(
      (res) => {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Producto editado',
          detail: '',
        });
        this.router.navigate(['admin', 'inventario', 'productos']);
      },
      (err) => {
        console.log(err);
        this.messageSvc.add({
          severity: 'error',
          summary: 'Error al editar producto',
          detail: '',
        });
      }
    );
  }
}
