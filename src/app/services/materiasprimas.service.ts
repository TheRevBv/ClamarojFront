import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MateriaPrima } from '@models/materiasprimas';

@Injectable({
  providedIn: 'root',
})
export class MateriasPrimasService {
  // public materiaPrima: MateriaPrima | null = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService
  ) {}

  getMateriasPrimas(params?: any): Observable<MateriaPrima[]> {
    return this.http.get<MateriaPrima[]>(`/api/MateriaPrimas`, {
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

  getMateriaPrima(idMateriaPrima: number): Observable<MateriaPrima> {
    return this.http.get<MateriaPrima>(`/api/MateriaPrimas/${idMateriaPrima}`);
  }

  createMateriaPrima(data: MateriaPrima): Observable<MateriaPrima> {
    return this.http.post<MateriaPrima>(`/api/MateriaPrimas`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
    });
  }

  updateMateriaPrima(materiaPrima: MateriaPrima): Observable<MateriaPrima> {
    return this.http.put<MateriaPrima>(
      `/api/MateriaPrimas/${materiaPrima.id!}`,
      materiaPrima,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': this.getCookie('csrftoken') || '',
          Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
        }),
      }
    );
  }

  deleteMateriaPrima(id: number): Observable<MateriaPrima> {
    return this.http.delete<MateriaPrima>(`/api/MateriaPrimas/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken') || '',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
      }),
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
