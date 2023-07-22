import { Component, OnInit, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@shared/services/layout.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

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
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [];
  itemsIcons: MenuItem[] = [];
  sidebarVisible = true;
  ruta: string = '';

  constructor(private layoutSvc: LayoutService, private router: Router) {
    // this.ruta = this.router.url;
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        routerLink: '/usuarios',
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
    // Obtener la ruta padre dinámica
    this.router.events.subscribe((event) => {
      // if (event instanceof Scroll) {
      if (event instanceof NavigationEnd) {
        // const urlSegments = event.routerEvent.url.split('/'); // Obtener los segmentos de la ruta
        const urlSegments = event.url.split('/'); // Obtener los segmentos de la ruta
        const parentRoute = urlSegments[1] || ''; // Obtener el primer segmento después del primer slash
        // Agregar la ruta padre a las rutas secundarias
        this.items.forEach((item) => {
          //valida si ya tiene una ruta padre igual a la añadida
          if (item.routerLink.includes(parentRoute)) {
            return;
          }
          item.routerLink = `/${parentRoute}${item.routerLink}`;
        });

        this.itemsIcons.forEach((item) => {
          //valida si ya tiene una ruta padre igual a la añadida
          if (item.routerLink.includes(parentRoute)) {
            return;
          }
          item.routerLink = `/${parentRoute}${item.routerLink}`;
        });
      }
    });
  }

  ngOnInit(): void {}
}
