import { Component, OnInit } from '@angular/core';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@models/productos';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../home.component.scss'],
})
export class ProductsComponent implements OnInit {
  list?: Producto[];
  constructor(private productService: ProductosService) {}

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.productService.getProductos().subscribe((item) => {
      this.list = item;
    });
  }
}
