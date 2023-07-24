/* import { CanActivateFn, CanActivateChildFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('access_token')) {
    return true;
  }
  return false;
};

export const adminChildGuard: CanActivateChildFn = (route, state) => {
  return adminGuard(route, state);
};
 */

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
import { UsuariosService } from '@services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard {
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
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
    if (this.usuariosService.usuario) {
      // let {email} = this.api.data;
      console.log(this.usuariosService.usuario);
      return true;
    }
    if (!localStorage.getItem('access_token')) {
      await this.router.navigate(['/admin/login']);
      return false;
    }

    try {
      this.usuariosService.getProfile(); // Assuming `getProfile()` returns a promise
      return true;
    } catch (error) {
      return false;
    }
  }
}
