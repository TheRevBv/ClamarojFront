import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { Receta } from '@models/recetas';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  });

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getRecetas(params: any): Observable<Receta[]> {
    return this.http.get<Receta[]>('/api/recetas', {
      params,
      headers: this.header,
    });
  }

  getReceta(id: number): Observable<Receta> {
    return this.http.get<Receta>(`/api/recetas/${id}`, {
      headers: this.header,
    });
  }

  addReceta(receta: Receta): Observable<Receta> {
    return this.http.post<Receta>('/api/recetas', receta, {
      headers: this.header,
    });
  }

  updateReceta(receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`/api/recetas/${receta.idReceta}`, receta, {
      headers: this.header,
    });
  }

  deleteReceta(id: number): Observable<Receta> {
    return this.http.delete<Receta>(`/api/recetas/${id}`, {
      headers: this.header,
    });
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
