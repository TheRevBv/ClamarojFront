import { CanActivateFn, CanActivateChildFn } from '@angular/router';

export const nonAdminGuard: CanActivateFn = (route, state) => {
  if (
    !localStorage.getItem('access_token') &&
    !localStorage.getItem('access_token_cliente') &&
    !localStorage.getItem('access_token_proveedor')
  ) {
    return true;
  }
  return false;
};

export const nonAdminChildGuard: CanActivateChildFn = (route, state) => {
  return nonAdminGuard(route, state);
};

/* import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !localStorage.getItem('token') ||
      !localStorage.getItem('access_token') ||
      !localStorage.getItem('access_token_cliente') ||
      !localStorage.getItem('access_token_proveedor')
      // || !localStorage.getItem('refresh_token')
      // || !localStorage.getItem('expires_in')
    ) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
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
}
 */
