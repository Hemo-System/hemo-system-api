import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty({ enum: DayOfWeek, description: 'Dia da semana para a escala', example: DayOfWeek.monday })
    @IsEnum(DayOfWeek)
    @IsNotEmpty()
    dayOfWeek: DayOfWeek;

    @ApiProperty({ description: 'Horário de início do turno da manhã no formato HH:mm', example: '08:00', required: false })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'startHourMorning must be in HH:mm format' })
    startHourMorning: string | null;

    @ApiProperty({ description: 'Horário de término do turno da manhã no formato HH:mm', example: '12:00', required: false })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'endHourMorning must be in HH:mm format' })
    endHourMorning: string | null;

    @ApiProperty({ description: 'Horário de início do turno da tarde no formato HH:mm', example: '14:00', required: false })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'startHourAfternoon must be in HH:mm format' })
    startHourAfternoon: string | null;

    @ApiProperty({ description: 'Horário de término do turno da tarde no formato HH:mm', example: '18:00', required: false })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'endHourAfternoon must be in HH:mm format' })
    endHourAfternoon: string | null;

    @ApiProperty({ description: 'Data de início da validade da escala no formato YYYY-MM-DD', example: '2025-07-01' })
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'Data de término da validade da escala no formato YYYY-MM-DD', example: '2025-12-31', required: false })
    @IsOptional()
    @IsDateString()
    finishDate: Date;

    @ApiProperty({ description: 'ID do profissional de saúde' })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}