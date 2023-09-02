import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from '@services/clientes.service';
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthClientesGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private api: ApiService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getProfile();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }

  async getProfile() {
    // Si el usuario ya esta logueado, no hace falta hacer la peticion
    if (this.clientesService.cliente) {
      // let {email} = this.api.data;
      console.log(this.clientesService.cliente);
      return true;
    }
    if (!localStorage.getItem('access_token_cliente')) {
      await this.router.navigate(['inicio/singin']);
      return false;
    }

    try {
      await this.clientesService.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }
}
