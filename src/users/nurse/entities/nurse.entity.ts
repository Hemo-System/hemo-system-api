import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProfessionalRole } from 'src/users/types/professional_role.enum';

export class Nurse {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: ProfessionalRole,
    default: ProfessionalRole.recepcionist,
  })
  role: ProfessionalRole = ProfessionalRole.nurse;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty()
  coren: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  adminId: number;
}
