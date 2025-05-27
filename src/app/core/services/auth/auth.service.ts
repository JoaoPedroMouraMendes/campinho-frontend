import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../../types/login-credentials.type';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.backendUrl
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
