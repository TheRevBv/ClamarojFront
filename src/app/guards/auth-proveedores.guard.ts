import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivateFn,
  CanActivateChildFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProveedoresService } from '@services/proveedores.service';

@Injectable({
  providedIn: 'root',
})
export class AuthProveedoresGuard {
  constructor(
    private router: Router,
    private proveedoresSvc: ProveedoresService
  ) {}

  canActivate: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    return this.getProfile();
  };

  canActivateChild: CanActivateChildFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    return this.canActivate(next, state);
  };

  async getProfile(): Promise<boolean | UrlTree> {
    // Si el usuario ya está logueado, no hace falta hacer la petición
    if (this.proveedoresSvc.proveedor) {
      // let {email} = this.api.data;
      console.log(this.proveedoresSvc.proveedor);
      return true;
    }
    if (!localStorage.getItem('access_token_proveedor')) {
      await this.router.navigate(['portal-proveedores', 'login']);
      return false;
    }

    try {
      this.proveedoresSvc.getProfile(); // Assuming `getProfile()` returns a promise
      return true;
    } catch (error) {
      return false;
    }
  }
}
