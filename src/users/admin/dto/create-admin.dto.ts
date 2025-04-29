import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalRole } from '@prisma/client';

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