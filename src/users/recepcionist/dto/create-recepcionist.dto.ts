import { ApiProperty } from '@nestjs/swagger';

export class CreateRecepcionistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
