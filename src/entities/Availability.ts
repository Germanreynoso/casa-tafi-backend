// Availability.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  isAvailable: boolean;

  @OneToMany(() => Reservation, reservation => reservation.availability)
  reservations: Reservation[];  // Asegúrate de que la relación esté configurada aquí también
}
