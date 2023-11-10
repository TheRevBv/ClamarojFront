import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { IReceivedValue } from '@models/templete';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent {
  router: Router;
  parentValue?: IReceivedValue;

  constructor(route: Router, private sharedDataService: SharedDataService) {
    this.router = route;
    this.sharedDataService.parentValue$.subscribe((value: IReceivedValue) => {
      this.parentValue = value;
    });
    this.passVariableToParent();
  }

  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Endiablada',
      image: 'assets/logos/Clamaroj-2.png',
      price: 65,
      category: 'Micheladas',
      quantity: 24,
      inventoryStatus: 'DISPONIBLE',
      rating: 5,
    },
    {
      id: '10001',
      code: 'f230fh0g3',
      name: 'Sabrimedusa',
      description: 'Botas',
      image: 'assets/logos/Clamaroj-2.png',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'DISPONIBLE',
      rating: 5,
    },
    {
      id: '10001',
      code: 'f230fh0g3',
      name: 'Sabrimedusa',
      description: 'Botas',
      image: 'assets/logos/Clamaroj-2.png',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'DISPONIBLE',
      rating: 5,
    },
    // Agrega más productos si lo deseas
  ];

  sortOptions!: any;
  sortOrder!: number;
  sortField!: string;

  passVariableToParent() {
    this.sharedDataService.updateParentValue({
      title: '',
      subtitle: 'Tu destino para Micheladas y Snacks únicos',
      text: 'assets/logos/testing.png',
      image: '',
    });
  }
}
