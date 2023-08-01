import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '@models/clientes';
import { HttpClient } from '@angular/common/http';
// import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  getClientes(params?: any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('api/clientes', { params });
  }

  getCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`api/clientes/${idCliente}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('api/clientes', cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`api/clientes/${cliente.idCliente}`, cliente);
  }

  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete<any>(`api/clientes/${idCliente}`);
  }
}
