import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  constructor(private latyoutService: LayoutService) { }

  ngOnInit(): void {
  }

  onToggleSidebar(): void {
    this.latyoutService.toggleSidebarVisibility();
  }

}
