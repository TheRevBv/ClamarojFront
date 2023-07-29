import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from '@models/login';
import { Usuario } from '@models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public usuario: Usuario | null = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService
  ) {}

  login(data: Login): Observable<any> {
    return this.http.post<Login>(`/api/Auth/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  registrar(data: Usuario): Observable<any> {
    return this.http.post<Usuario>(`/api/Auth/registrar`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/Auth/usuario/${email}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  getUsuarios(params?: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Usuarios`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/Usuario/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  updateUsuario(data: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`/api/Usuario`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  getProfile(): void {
    try {
      this.usuario = localStorage.getItem('usuario')
        ? JSON.parse(localStorage.getItem('usuario') || '')
        : null;
    } catch (e) {
      console.log(e);
    }
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`/api/Usuario/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario');
    localStorage.clear();
    this.usuario = null;
    this.router.navigate(['/admin/login']).then((r) => r);
  }

  getCookie(key: string): string | undefined {
    return this.cookie.get(key);
  }

  setCookie(key: string, value: string): void {
    this.cookie.put(key, value);
  }

  deleteCookie(key: string): void {
    this.cookie.remove(key);
  }
}
