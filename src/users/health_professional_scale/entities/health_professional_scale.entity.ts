import { ApiProperty } from '@nestjs/swagger';

export class HealthProfessionalScale {
    @ApiProperty()
    id: number;

    @ApiProperty()
    start: Date;

    @ApiProperty()
    exit: Date;

    @ApiProperty()
    isPlantonist: boolean;

    @ApiProperty()
    healthProfessionalId: number;

    @ApiProperty()
    adminId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    isActive: boolean;
}