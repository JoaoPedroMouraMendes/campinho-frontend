import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  saveRole(role: string) {
    localStorage.setItem('role', role)
  }

  getRole(): string | null {
    return localStorage.getItem('role')
  }
}
