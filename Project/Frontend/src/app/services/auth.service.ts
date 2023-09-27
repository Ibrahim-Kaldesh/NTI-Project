import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  basUrl = 'http://127.0.0.1:3000/users/';

  login(body: any): Observable<any> {
    return this.http.post(`${this.basUrl}login`, body);
  }
}
