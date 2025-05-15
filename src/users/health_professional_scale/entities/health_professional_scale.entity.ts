import { ApiProperty } from '@nestjs/swagger';

export class HealthProfessionalScale {
    @ApiProperty()
    id: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    startHour: string;

    @ApiProperty()
    exitHour: string;

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