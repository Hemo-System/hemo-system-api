import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalRole } from 'src/users/types/professional_role.enum';

export class CreateHealthProfessionalDto {
    @ApiProperty({ enum: ProfessionalRole, default: ProfessionalRole.healthProfessional })
    role: ProfessionalRole = ProfessionalRole.healthProfessional;

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