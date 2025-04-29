import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalRole } from '@prisma/client';

export class CreateRecepcionistDto {
    @ApiProperty({ enum: ProfessionalRole, default: ProfessionalRole.recepcionist })
    role: ProfessionalRole = ProfessionalRole.recepcionist;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}