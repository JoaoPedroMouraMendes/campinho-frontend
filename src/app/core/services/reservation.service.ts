import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../types/reservation.type';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getCurrentReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/active`)
  }
}
