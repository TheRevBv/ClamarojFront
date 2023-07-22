import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<Login>(`/api/auth/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  onLogin(data: Login) {
    this.login(data).subscribe(
      (res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuario = res.usuario;
        this.router.navigate(['/dashboard']).then((r) => r);
      },
      (err) => {
        console.log(err);
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
      }
    );
  }

  registrar(data: Usuario): Observable<any> {
    return this.http.post<Usuario>(`/api/auth/registrar`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/auth/usuario/${email}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
      }),
    });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/auth/usuarios`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`/api/auth/usuario/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  updateUsuario(data: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`/api/auth/usuario`, data, {
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
    return this.http.delete<Usuario>(`/api/auth/usuario/${id}`, {
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
    this.router.navigate(['/login']).then((r) => r);
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
