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
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: '/dashboard',
          },
          {
            label: 'Reportes',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: '/reportes',
          },
        ],
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        items: [
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
        ],
      },
      {
        label: 'Inventario',
        icon: 'fa fa-fw fa-cubes',
        items: [
          {
            label: 'Productos',
            icon: 'fa fa-beer fa-fw',
            routerLink: '/inventario/productos',
          },
          {
            label: 'Materia Prima',
            icon: 'fa fa-fw fa-cubes',
            routerLink: '/inventario/materias-primas',
          },
          // {
          //   label: 'Categorías',
          //   icon: 'pi pi-fw pi-users',
          //   routerLink: '/inventario/categorias',
          // }
        ],
      },
      {
        label: 'Producción',
        icon: 'pi pi-fw pi-cog',
        items: [
          // {
          //   label: 'Producción',
          //   icon: 'pi pi-fw pi-cog',
          //   routerLink: '/produccion',
          // },
          {
            label: 'Recetas',
            icon: 'fa fa-book fa-fw',
            routerLink: '/produccion/recetas',
          },
          // {
          //   label: 'Unidades de Medida',
          //   icon: 'fa fa-cutlery fa-fw',
          //   routerLink: '/produccion/unidades-medida',
          // },
        ],
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi-dollar',
        items: [
          {
            label: 'Pedidos',
            icon: 'fa fa-th-large fa-fw',
            routerLink: '/pedidos',
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
        ],
      },
      // {
      //   label: 'Configuración',
      //   icon: 'pi pi-fw pi-cog',
      //   items: [
      //     {
      //       label: 'Roles',
      //       icon: 'pi pi-fw pi-users',
      //       routerLink: '/configuracion/roles',
      //     },
      //     {
      //       label: 'Estatus',
      //       icon: 'pi pi-fw pi-users',
      //       routerLink: '/configuracion/estatus',
      //     },
      //     // {
      //     //   label: 'Categorías',
      //     //   icon: 'pi pi-fw pi-users',
      //     //   routerLink: '/configuracion/categorias',
      //     // }
      //   ],
      // },
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
          item.items?.forEach((subItem) => {
            if (subItem.routerLink.includes(parentRoute)) {
              return;
            }
            subItem.routerLink = `/${parentRoute}${subItem.routerLink}`;
          });
        });
        // console.log(this.items);
        // Mostrar solo iconos en el sidebar para las rutas secundarias
        if (this.sidebarVisible) {
          this.itemsIcons = this.items.map((item) => {
            const newItem = { ...item };
            newItem.label = newItem.label?.substring(0, 1);
            newItem.items = item.items?.map((subItem) => {
              const newSubItem = { ...subItem };
              newSubItem.label = '';
              return newSubItem;
            });
            return newItem;
          });
        }
      }
    });
  }

  ngOnInit(): void {}
}
