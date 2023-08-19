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
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService
  ) {}

  login(data: Login): Observable<any> {
    return this.http.post<Login>(`/api/Auth/login`, data, {
      headers: this.header,
    });
  }

  registrar(data: Usuario): Observable<any> {
    return this.http.post<Usuario>(`/api/Auth/registrar`, data, {
      headers: this.header,
    });
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/Auth/usuario/${email}`, {
      headers: this.header,
    });
  }

  getUsuarios(params?: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Usuarios`, {
      headers: this.header,
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/Usuarios/${id}`, {
      headers: this.header,
    });
  }

  updateUsuario(data: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`/api/Usuarios/${data.id}`, data, {
      headers: this.header,
    });
  }

  getProfile(): void {
    try {
      this.usuario = localStorage.getItem('usuario')
        ? JSON.parse(localStorage.getItem('usuario') || '')
        : null;
      // console.log(this.usuario);
    } catch (e) {
      console.log(e);
    }
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`/api/Usuarios/${id}`, {
      headers: this.header,
    });
  }

  addUsuario(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`/api/Usuarios`, data, {
      headers: this.header,
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
