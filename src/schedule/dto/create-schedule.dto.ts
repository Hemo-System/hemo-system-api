import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus } from '@prisma/client';
import { IsEnum, IsInt, IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateScheduleDto {
    @ApiProperty({ description: 'Schedule notes', required: false })
    @IsString()
    @IsOptional()
    notes: string | null;

    @ApiProperty({ description: 'Reason of cancellation', required: false })
    @IsString()
    @IsOptional()
    cancelReason: string | null;

    @ApiProperty({ description: 'Schedule date and time', example: '2025-05-29T14:30:00Z' })
    @IsDateString()
    @IsNotEmpty()
    scheduleDateTime: Date;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;

    @ApiProperty({ description: 'ID of the health professional scale associated with the schedule', required: false })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalScaleId: number;

    @ApiProperty({ description: 'ID of the admin who created the schedule', required: false })
    @IsInt()
    @IsOptional()
    adminId: number | null;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule', required: false })
    @IsInt()
    @IsOptional()
    recepcionistId: number | null;
}