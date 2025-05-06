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
      date: new Date(date), // Convertir el string a Date
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
      where: { id },
    });

    if (!availability) {
      throw new Error('Fecha no encontrada');
    }

    availability.isAvailable = isAvailable;
    return this.availabilityRepository.save(availability);
  }

  async seedAvailability(start: string, end: string): Promise<void> {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates: Availability[] = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const availability = new Availability();
      availability.date = new Date(date);
      availability.isAvailable = true;
      dates.push(availability);
    }

    await this.availabilityRepository.save(dates);
    console.log(`Disponibilidad creada entre ${start} y ${end}`);
  }
}
