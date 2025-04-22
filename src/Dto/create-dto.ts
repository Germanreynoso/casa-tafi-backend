import { IsString, IsEmail } from 'class-validator';


export class CreateReservationDto {
    @IsString()
    guestName: string;
  
    @IsEmail()
    guestEmail: string;
  
    @IsString()
    date: string;
  }
  