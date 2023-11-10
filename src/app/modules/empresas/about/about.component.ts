import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { IReceivedValue } from '@models/templete';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
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
      title: 'Nosotros',
      subtitle: 'Tu destino para Micheladas y Snacks únicos \n \n',
      text: '',
      image: '',
    });
  }
}
