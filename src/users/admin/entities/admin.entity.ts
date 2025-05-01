import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { ProfessionalRole } from "src/users/types/professional_role.enum";

export class Admin {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: ProfessionalRole, default: ProfessionalRole.admin })
    role: ProfessionalRole = ProfessionalRole.admin;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiHideProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    isActive: boolean;
}
