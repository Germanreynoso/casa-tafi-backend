import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from 'src/entities/Availability';
@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  // Crear una nueva fecha disponible
  async createAvailability(date: string): Promise<Availability> {
    const newAvailability = this.availabilityRepository.create({
      date,
      isAvailable: true,
    });

    return await this.availabilityRepository.save(newAvailability);
  }

  // Obtener todas las fechas disponibles
  async findAllAvailability(): Promise<Availability[]> {
    return this.availabilityRepository.find();
  }

  // Cambiar la disponibilidad de una fecha
  async updateAvailability(id: number, isAvailable: boolean): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({
      where: { id },  // Pasa el id como parte de un objeto
    });
  
    if (!availability) {
      throw new Error('Fecha no encontrada');
    }
  
    availability.isAvailable = isAvailable;
    return this.availabilityRepository.save(availability);
  }
  
}
