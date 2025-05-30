import { ApiProperty } from '@nestjs/swagger';
import { ScheduleType, ScheduleStatus } from '@prisma/client';

export class Schedule {
    @ApiProperty({ description: 'Unique identifier for the schedule' })
    id: number;

    @ApiProperty({ enum: ScheduleType, description: 'Type of the schedule (previously or immediate)' })
    type: ScheduleType;

    @ApiProperty({ enum: ScheduleStatus, description: 'Status of the schedule', default: ScheduleStatus.scheduled })
    status: ScheduleStatus;

    @ApiProperty({ description: 'Observações sobre o agendamento', nullable: true })
    notes: string | null;

    @ApiProperty({ description: 'Motivo do cancelamento', nullable: true })
    cancelReason: string | null;

    @ApiProperty({ description: 'Data do agendamento' })
    scheduledDate: Date;

    @ApiProperty({ description: 'Horário no formato HH:mm', example: '14:30' })
    scheduledTime: string;

    @ApiProperty({ description: 'ID of the pacient associated with the schedule' })
    pacientId: number;

    @ApiProperty({ description: 'ID of the health professional associated with the schedule' })
    healthProfessionalId: number;

    @ApiProperty({ description: 'Date when the schedule was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the schedule was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Indicates whether the schedule is active', default: true })
    isActive: boolean;

    @ApiProperty({ description: 'ID of the recepcionist who created the schedule', nullable: true })
    recepcionistId?: number | null;

    @ApiProperty({ description: 'ID of the admin who created the schedule', nullable: true })
    adminId?: number | null;
}