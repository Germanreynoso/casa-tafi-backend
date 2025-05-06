import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Availability } from 'src/entities/Availability';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,

    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  // Crear una nueva reserva
  async createReservation(guestName: string, guestEmail: string, checkIn: string, checkOut: string): Promise<Reservation> {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const checkInAvailability = await this.availabilityRepository.findOne({ where: { date: checkInDate, isAvailable: true } });
    const checkOutAvailability = await this.availabilityRepository.findOne({ where: { date: checkOutDate, isAvailable: true } });

    if (!checkInAvailability || !checkOutAvailability) {
      throw new Error('Una o ambas fechas no están disponibles');
    }

    const newReservation = this.reservationsRepository.create({
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      availability: [checkInAvailability, checkOutAvailability], // Ahora es un array
    });

    return await this.reservationsRepository.save(newReservation);
  }

  // Obtener todas las reservas
  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationsRepository.find({ relations: ['availability'] });
  }

  // Eliminar una reserva
  async deleteReservation(id: number): Promise<void> {
    await this.reservationsRepository.delete(id);
  }
}
