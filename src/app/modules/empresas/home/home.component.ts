import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { IReceivedValue } from '@app/models/templete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  router: Router;
  parentValue?: IReceivedValue;

  constructor(route: Router, private sharedDataService: SharedDataService) {
    this.router = route;
    this.sharedDataService.parentValue$.subscribe((value: IReceivedValue) => {
      this.parentValue = value;
    });
  }

  ngOnInit(): void {
    this.passVariableToParent();
  }

  passVariableToParent() {
    this.sharedDataService.updateParentValue({
      title: 'Bienvenido a ClamaROJ',
      subtitle: 'Tu destino para Micheladas y Snacks únicos',
      text: 'Aquí es donde el encanto de una michelada perfectamente preparada se encuentra con la satisfacción crujiente de los snacks más deliciosos. Nuestro compromiso es ofrecerte mucho más que productos; te invitamos a una experiencia',
      image: 'assets/logos/testing.png',
    });
  }
}