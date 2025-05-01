import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalRole } from 'src/users/types/professional_role.enum';

export class CreateAdminDto {
    @ApiProperty({ enum: ProfessionalRole, default: ProfessionalRole.admin })
    role: ProfessionalRole = ProfessionalRole.admin;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}