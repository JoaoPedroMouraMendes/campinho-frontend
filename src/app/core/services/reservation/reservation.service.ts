import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../types/reservation.type';
import { CreateReservation } from '../../types/create-reservation.type';
import { UpdateReservation } from '../../types/update-reservation.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = environment.backendUrl
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

  editReservation(editedReservation: UpdateReservation, reservationId: string): Observable<Object> {
    return this.http.put(`${this.apiUrl}/api/reservation/${reservationId}`, editedReservation, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
