import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { Availability } from 'src/entities/Availability';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // Crear una nueva fecha disponible
  @Post()
  async create(
    @Body('date') date: string,
  ): Promise<Availability> {
    return this.availabilityService.createAvailability(date);
  }

  // Obtener todas las fechas disponibles
  @Get()
  async findAll(): Promise<Availability[]> {
    return this.availabilityService.findAllAvailability();
  }

  // Cambiar la disponibilidad de una fecha
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('isAvailable') isAvailable: boolean,
  ): Promise<Availability> {
    return this.availabilityService.updateAvailability(id, isAvailable);
  }
}
