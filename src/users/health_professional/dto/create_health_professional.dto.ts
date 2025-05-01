import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthProfessionalDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  specialty: string;

  @ApiProperty()
  professionalRegister: string;
}
