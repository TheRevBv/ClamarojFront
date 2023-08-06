import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MateriaPrima } from '@app/models/materiasprimas';

@Injectable({
    providedIn: 'root',
})
export class MateriasPrimasService {
    public materiaPrima: MateriaPrima | null = null;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
        private cookie: CookieService
    ) {}

    getMateriasPrimas(params?: any): Observable<MateriaPrima[]>
    {
        return this.http.get<MateriaPrima[]>(`/api/MateriasPrimas`, {
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

    getMateriaPrima(id: number): Observable<MateriaPrima>
    {
        return this.http.get<MateriaPrima>(`/api/MateriasPrimas/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken') || '',
                Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
            }),
        });
    }

    createMateriaPrima(data: MateriaPrima): Observable<any>
    {
        return this.http.post<MateriaPrima>(`/api/MateriasPrimas`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken') || '',
            }),
        });
    }

    updateMateriaPrima(data: MateriaPrima): Observable<MateriaPrima>
    {
        return this.http.put<MateriaPrima>(`/api/MateriasPrimas`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken') || '',
                Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
            }),
        });
    }

    deleteMateriaPrima(id: number): Observable<MateriaPrima>
    {
        return this.http.delete<MateriaPrima>(`/api/MateriasPrimas/${id}`, {
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
