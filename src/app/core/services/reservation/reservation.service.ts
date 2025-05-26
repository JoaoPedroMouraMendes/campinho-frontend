import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../types/reservation.type';
import { CreateReservation } from '../../types/createReservation.type';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = 'http://localhost:8080'
  http = inject(HttpClient)
  reservations?: Reservation[]

  constructor() { this.loadCurrentReservations() }

  loadCurrentReservations() {
    this.getCurrentReservations().subscribe(response => {
      this.reservations = response
    })
  }

  getCurrentReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/active`)
  }

  createReservation(reservation: CreateReservation): Observable<Object> {
    return this.http.post(`${this.apiUrl}/api/reservation`, reservation, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  deleteReservation(reservationId: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/api/reservation/${reservationId}`)
  }
}
