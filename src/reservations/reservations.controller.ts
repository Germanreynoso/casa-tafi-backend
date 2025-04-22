import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from 'src/entities/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Crear una nueva reserva
  @Post()
  async create(
    @Body('guestName') guestName: string,
    @Body('guestEmail') guestEmail: string,
    @Body('checkIn') checkIn: string,
    @Body('checkOut') checkOut: string,
  ): Promise<Reservation> {
    return this.reservationsService.createReservation(guestName, guestEmail, checkIn, checkOut);
  }

  // Obtener todas las reservas
  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAllReservations();
  }

  // Eliminar una reserva
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.reservationsService.deleteReservation(id);
  }
}
