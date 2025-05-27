import { Reservation } from "./reservation.type";

export type UpdateReservation = Omit<Reservation, 'id' | 'createdAt'>
