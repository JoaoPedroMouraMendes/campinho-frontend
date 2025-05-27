import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../../types/login-credentials.type';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8080'
  http = inject(HttpClient)
  storageService = inject(StorageService)

  constructor() { }

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, loginCredentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getToken()
  }

  isAdmin(): boolean {
    return this.storageService.getRole() === 'ADMIN'
  }
}
