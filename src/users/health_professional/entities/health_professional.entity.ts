import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { ProfessionalRole } from 'src/users/types/professional_role.enum';

export class HealthProfessional {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: ProfessionalRole, default: ProfessionalRole.healthProfessional })
    role: ProfessionalRole = ProfessionalRole.healthProfessional;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiHideProperty()
    password: string;

    @ApiProperty()
    specialty: string;

    @ApiProperty()
    professionalRegister: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    isActive: boolean;
}
