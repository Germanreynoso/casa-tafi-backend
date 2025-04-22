// reservation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Availability } from './Availability';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guestName: string;

  @Column()
  guestEmail: string;

  @Column()
  checkIn: string;

  @Column()
  checkOut: string;

  @ManyToOne(() => Availability, availability => availability.reservations)
  availability: Availability;  // Asegúrate de que esta relación esté bien configurada
}
