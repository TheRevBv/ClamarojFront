import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@shared/services/layout.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('300ms ease-out')),
      transition('hidden => visible', animate('300ms ease-in')),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [];
  itemsIcons: MenuItem[] = [];
  sidebarVisible = true;

  constructor(private layoutSvc: LayoutService) {

  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        routerLink: '/admin',
      },
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes',
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck',
        routerLink: '/proveedores',
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/productos',
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-dollar',
        routerLink: '/ventas',
      },
      {
        label: 'Compras',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/compras',
      },
      {
        label: 'Reportes',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/reportes',
      },
      {
        label: 'Configuración',
        icon: 'pi pi-fw pi-cog',
        routerLink: '/configuracion',
      },
    ];

    this.itemsIcons = [
      {
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      },
      {
        icon: 'pi pi-fw pi-user',
        routerLink: '/admin',
      },
      {
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes',
      },
      {
        icon: 'pi pi-fw pi-truck',
        routerLink: '/proveedores',
      },
      {
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/productos',
      },
      {
        icon: 'pi pi-fw pi-dollar',
        routerLink: '/ventas',
      },
      {
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/compras',
      },
      {
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/reportes',
      },
      {
        icon: 'pi pi-fw pi-cog',
        routerLink: '/configuracion',
      },
    ];

    this.layoutSvc.sidebarVisible$.subscribe((value) => {
      this.sidebarVisible = value;
    });
  }
}
