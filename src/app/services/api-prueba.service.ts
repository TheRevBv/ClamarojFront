import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiPruebaService {
  uri: string = '';
  public usuario: any = null;
  data = {};

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async get() {
    try {
      let response = await fetch(this.uri, {
        method: 'GET',
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
          Autorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();
      return await data;
    } catch (error) {
      return error;
    }
  }

  async post(model: any) {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify(model),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
          Autorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();
      return await data;
    } catch (error) {
      return error;
    }
  }

  async put(model: any) {
    try {
      const response = await fetch(this.uri, {
        method: 'PUT',
        body: JSON.stringify(model),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
          Autorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();
      return await data;
    } catch (error) {
      return error;
    }
  }

  async delete(model: any) {
    try {
      const response = await fetch(this.uri, {
        method: 'DELETE',
        body: JSON.stringify(model),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
          Autorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();
      return await data;
    } catch (error) {
      return error;
    }
  }

  async loginAuthUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const token = JSON.stringify(data.access_token);
      const usuario = JSON.stringify(data.data);
      if (token) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('usuario', usuario);
        await this.getProfile();
        await this.router.navigate(['/']);
        this.toastr.success(`Bienvenido ${data.data.username}`);
      }
      return await data;
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  async registerAuthUser({
    email,
    password,
    nombre,
  }: {
    email: string;
    password: string;
    nombre: string;
  }): Promise<any> {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify({ email, password, nombre }),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        await this.router.navigate(['/login']);
        return data;
      } else {
        this.toastr.error(data.message);
      }
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  async getProfile(): Promise<any> {
    try {
      this.usuario = await this.http.get(this.uri);
    } catch (error) {
      this.logout();
      return error;
    }
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
