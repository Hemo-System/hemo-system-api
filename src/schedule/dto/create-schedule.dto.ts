import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus, ScheduleType } from '@prisma/client';
import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateScheduleDto {
    @ApiProperty({ description: 'Date of the schedule', example: '2025-05-20' })
    @IsISO8601()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ enum: ScheduleType, description: 'Type of the schedule (previously or immediate)' })
    @IsEnum(ScheduleType)
    @IsNotEmpty()
    type: ScheduleType;

    @ApiProperty({ enum: ScheduleStatus, description: 'Status of the schedule (e.g., scheduled, confirmed, canceled, consulted)' })
    @IsEnum(ScheduleStatus)
    @IsOptional()
    status: ScheduleStatus = ScheduleStatus.scheduled;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    @IsInt()
    @IsNotEmpty()
    healthPrefessionalId: number;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule (optional)' })
    @IsInt()
    @IsOptional()
    recepcionistId: number | null;

    @ApiProperty({ description: 'ID of the admin who created the schedule (optional)' })
    @IsInt()
    @IsOptional()
    adminId: number | null;
}