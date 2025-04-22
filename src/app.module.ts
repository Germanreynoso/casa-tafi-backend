import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { Reservation } from './entities/reservation.entity'; // Importa las entidades
import { Availability } from './entities/Availability';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',  // Usa tu configuración
      password: 'laki1405',
      database: 'ecommerce',
      entities: [Reservation, Availability],
      synchronize: true,
    }),
    ReservationsModule, // Asegúrate de incluirlo aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
