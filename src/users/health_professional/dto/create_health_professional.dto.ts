import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHealthProfessionalDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  specialty: string;

  @ApiProperty()
  @IsString()
  professionalRegister: string;
}
