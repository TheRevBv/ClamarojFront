import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE_URL = 'https://localhost:7092/'; // Provide the base URL

  constructor(private http: HttpClient, private cookie: CookieService) {}

  private getHeaders(): HttpHeaders {
    const csrfToken = this.getCookie('csrftoken');
    return new HttpHeaders({
      'X-CSRFToken': csrfToken || '', // Provide a default value if undefined
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong');
  }

  get(uri: string): Observable<any> {
    return this.http
      .get(`${this.BASE_URL}${uri}`, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError(error)));
  }

  post(uri: string, model: any): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}${uri}`, model, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete(uri: string): Observable<any> {
    return this.http
      .delete(`${this.BASE_URL}${uri}`, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Implement similar methods for PUT, DELETE, loginAuth, registerAuth, and getProfile

  private getCookie(key: string): string | undefined {
    return this.cookie.get(key);
  }

  // Implement setCookie and deleteCookie methods
}
