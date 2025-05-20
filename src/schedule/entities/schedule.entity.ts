import { ApiProperty } from '@nestjs/swagger';
import { ScheduleType, ScheduleStatus } from '@prisma/client';

export class Schedule {
    @ApiProperty({ description: 'Unique identifier for the schedule' })
    id: number;

    @ApiProperty({ description: 'Date of the schedule', example: '2025-05-20' })
    date: Date;

    @ApiProperty({ description: 'Hour of the schedule', example: '14:00' })
    hour: string;

    @ApiProperty({ enum: ScheduleType, description: 'Type of the schedule (previously or immediate)' })
    type: ScheduleType;

    @ApiProperty({ enum: ScheduleStatus, description: 'Status of the schedule (e.g., scheduled, confirmed, canceled, consulted)' })
    status: ScheduleStatus;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule' })
    recepcionistId: number;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    healthPrefessionalId: number;

    @ApiProperty({ description: 'ID of the consultation history, if available', nullable: true })
    consultationHistoryId?: number;

    @ApiProperty({ description: 'Date when the schedule was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the schedule was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Indicates whether the schedule is active' })
    isActive: boolean;
}