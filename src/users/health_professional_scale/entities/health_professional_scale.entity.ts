import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';

export class HealthProfessionalScale {
    @ApiProperty()
    id: number;

    @ApiProperty()
    dayOfWeek: DayOfWeek;

    @ApiProperty({ description: 'Horário de início no formato HH:mm', example: '08:00' })
    startHourMorning: string | null;

    @ApiProperty({ description: 'Horário de término no formato HH:mm', example: '12:00' })
    endHourMorning: string | null;

    @ApiProperty({ description: 'Horário de início no formato HH:mm', example: '14:00' })
    startHourAfternoon: string | null;

    @ApiProperty({ description: 'Horário de término no formato HH:mm', example: '18:00' })
    endHourAfternoon: string | null;

    @ApiProperty({ description: 'Data de início da escala' })
    startDate: Date;

    @ApiProperty({ description: 'Data de término da escala' })
    finishDate: Date;

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