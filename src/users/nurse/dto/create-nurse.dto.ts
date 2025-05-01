import { ApiProperty } from '@nestjs/swagger';

export class CreateNurseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  coren: string;
}
