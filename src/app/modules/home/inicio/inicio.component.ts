import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['../home.component.scss']
})
export class InicioComponent {

  constructor (
    router : Router,
  ) { }
}
