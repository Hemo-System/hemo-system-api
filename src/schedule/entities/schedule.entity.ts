import { ApiProperty } from '@nestjs/swagger';
import { ScheduleType, ScheduleStatus } from '@prisma/client';

export class Schedule {
    @ApiProperty({ description: 'Unique identifier for the schedule' })
    id: number;

    @ApiProperty({ description: 'Date of the schedule' })
    date: Date;

    @ApiProperty({ enum: ScheduleType, description: 'Type of the schedule (previously or immediate)' })
    type: ScheduleType;

    @ApiProperty({ enum: ScheduleStatus, description: 'Status of the schedule (e.g., scheduled, confirmed, canceled, consulted)' })
    status: ScheduleStatus;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    healthPrefessionalId: number;

    @ApiProperty({ description: 'Date when the schedule was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the schedule was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Indicates whether the schedule is active' })
    isActive: boolean;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule' })
    recepcionistId: number | null;

    @ApiProperty({ description: 'ID of the admin who created the schedule' })
    adminId: number | null;
}