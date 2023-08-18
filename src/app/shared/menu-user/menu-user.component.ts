import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css'],
})
export class MenuUserComponent {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
}
