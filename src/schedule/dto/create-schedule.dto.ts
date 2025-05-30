import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus, ScheduleType } from '@prisma/client';
import { IsEnum, IsInt, IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateScheduleDto {
    @ApiProperty({ enum: ScheduleType, description: 'Type of the schedule (previously or immediate)' })
    @IsEnum(ScheduleType)
    @IsNotEmpty()
    type: ScheduleType;

    @ApiProperty({ enum: ScheduleStatus, description: 'Status of the schedule', default: ScheduleStatus.scheduled })
    @IsEnum(ScheduleStatus)
    @IsOptional()
    status?: ScheduleStatus;

    @ApiProperty({ description: 'Observações sobre o agendamento', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({ description: 'Motivo do cancelamento', required: false })
    @IsString()
    @IsOptional()
    cancelReason?: string;

    @ApiProperty({ description: 'Data do agendamento no formato ISO', example: '2025-05-29' })
    @IsDateString()
    @IsNotEmpty()
    scheduledDate: string;

    @ApiProperty({ description: 'Horário no formato HH:mm', example: '14:30' })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'scheduledTime must be in HH:mm format' })
    @IsNotEmpty()
    scheduledTime: string;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}