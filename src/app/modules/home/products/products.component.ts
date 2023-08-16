import { Component, OnInit } from '@angular/core';
import { Articulos } from '@models/articulos';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../home.component.scss'],
})
export class ProductsComponent implements OnInit {
  list?: Articulos[];
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.ApiService.get('api/articulos?almacen=1').subscribe((item) => {
      let { data } = item;
      this.list = data;
    });
  }
}
