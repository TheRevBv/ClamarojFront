import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estatus } from '@models/estatus';

@Injectable({
  providedIn: 'root',
})
export class EstatusService {
  constructor(private http: HttpClient) {}

  getEstatus(params?: any): Observable<Estatus[]> {
    return this.http.get<Estatus[]>('api/estatus', { params });
  }

  getEstatusById(id: number): Observable<Estatus> {
    return this.http.get<Estatus>(`api/estatus/${id}`);
  }

  addEstatus(estatus: Estatus): Observable<Estatus> {
    return this.http.post<Estatus>('api/estatus', estatus);
  }

  updateEstatus(estatus: Estatus): Observable<Estatus> {
    return this.http.put<Estatus>(`api/estatus/${estatus.idEstatus}`, estatus);
  }
}
