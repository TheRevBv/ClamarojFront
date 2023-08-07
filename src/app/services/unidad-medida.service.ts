import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadMedida } from '@models/unidades-medida';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {
  constructor(private http: HttpClient) {}

  getUnidadesMedida(params?: any): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>('api/unidadMedidas', { params });
  }

  getUnidadMedida(idUnidadMedida: number): Observable<UnidadMedida> {
    return this.http.get<UnidadMedida>(`api/unidadMedidas/${idUnidadMedida}`);
  }

  addUnidadMedida(unidadMedida: UnidadMedida): Observable<UnidadMedida> {
    return this.http.post<UnidadMedida>('api/unidadMedidas', unidadMedida);
  }

  updateUnidadMedida(unidadMedida: UnidadMedida): Observable<UnidadMedida> {
    return this.http.put<UnidadMedida>(
      `api/unidadMedidas/${unidadMedida.idUnidadMedida}`,
      unidadMedida
    );
  }

  deleteUnidadMedida(idUnidadMedida: number): Observable<any> {
    return this.http.delete<any>(`api/unidadMedidas/${idUnidadMedida}`);
  }
}
