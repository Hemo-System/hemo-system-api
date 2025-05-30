import { ApiProperty } from '@nestjs/swagger';

export class HealthProfessionalScale {
    @ApiProperty()
    id: number;

    @ApiProperty({ default: false })
    isPlantonist: boolean;

    @ApiProperty({ description: 'Data da escala' })
    date: Date;

    @ApiProperty({ description: 'Horário de início no formato HH:mm', example: '07:30' })
    startTime: string;

    @ApiProperty({ description: 'Horário de término no formato HH:mm', example: '17:00' })
    endTime: string;

    @ApiProperty()
    healthProfessionalId: number;

    @ApiProperty()
    adminId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ default: true })
    isActive: boolean;
}