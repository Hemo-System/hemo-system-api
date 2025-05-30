import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus, ScheduleType } from '@prisma/client';
import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
    @ApiProperty({ description: 'Data e hora específica do agendamento', example: '2025-05-29T14:30:00Z' })
    @IsISO8601()
    @IsNotEmpty()
    scheduledAt: Date;

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

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule (optional)' })
    @IsInt()
    @IsOptional()
    recepcionistId?: number;

    @ApiProperty({ description: 'ID of the admin who created the schedule (optional)' })
    @IsInt()
    @IsOptional()
    adminId?: number;
}