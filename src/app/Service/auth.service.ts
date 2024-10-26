import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:7265/api/Auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: Login): Observable<any>{
      return this.http.post(this.authUrl, credentials);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);  // Check "exp" for expiry timestamp
    return true;
  }
  return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

  
}
