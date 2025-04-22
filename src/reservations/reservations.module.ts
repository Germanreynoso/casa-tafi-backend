import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Availability } from 'src/entities/Availability';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { AvailabilityController } from 'src/availability/availability.controller';
import { AvailabilityService } from 'src/availability/availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Availability])],
  controllers: [ReservationsController, AvailabilityController],
  providers: [ReservationsService, AvailabilityService],
})
export class ReservationsModule {}
