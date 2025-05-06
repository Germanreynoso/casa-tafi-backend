import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  isAvailable: boolean;

  @OneToMany(() => Reservation, reservation => reservation.availability)
  reservations: Reservation[];
}
