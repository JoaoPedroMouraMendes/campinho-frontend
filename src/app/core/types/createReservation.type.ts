import { Reservation } from "./reservation.type";

export type CreateReservation = Omit<Reservation, 'id' | 'createdAt'>
