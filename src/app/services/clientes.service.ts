import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '@models/clientes';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Usuario } from '@models/usuarios';
// import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}
  public cliente: Usuario | null = null;

  getClientes(params?: any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('api/Clientes', { params });
  }

  getCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`api/Clientes/${idCliente}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('api/Clientes', cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`api/Clientes/${cliente.idCliente}`, cliente);
  }

  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete<any>(`api/Clientes/${idCliente}`);
  }

  getClienteByUsuario(idUsuario: number): Observable<Cliente> {
    return this.http.get<Cliente>(`api/Clientes/usuario/${idUsuario}`);
  }

  getCookie(key: string) {
    return this.cookie.get(key);
  }

  setCookie(key: string, value: string): void {
    this.cookie.put(key, value);
  }

  deleteCookie(key: string): void {
    this.cookie.remove(key);
  }
  /*
  async loginAuthCliente({ email, password }: any): Promise<any> {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken'),
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const token = JSON.stringify(data.access_token);
      const cliente = JSON.stringify(data.data);
      console.log(data.data);
      if (token) {
        localStorage.setItem('access_token_cliente', token);
        localStorage.setItem('cliente', cliente);
        await this.getProfile();
        await this.router.navigate(['/home/products']).then((r) => {
          window.location.reload();
        });
        `Bienvenido ${data.data.nombre}`;
      }
      return await data;
    } catch (error) {
      error.message;
    }
  }

  async registerAuthCliente(mode): Promise<any> {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify(mode),
        headers: {
          'X-CSRFToken': this.getCookie('csrftoken'),
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        data.message;
        await this.router.navigate(['/home/signin']);
        return data;
      } else {
        data.message;
      }
    } catch (error) {
      error.message;
    }
  }
*/
  async getProfile() {
    try {
      this.cliente = JSON.parse(localStorage.getItem('cliente')!);
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.cliente = null;
    this.router.navigate(['/inicio']).then((r) => r);
  }
}
