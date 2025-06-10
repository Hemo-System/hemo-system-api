import { ApiProperty } from '@nestjs/swagger';
import { Anamnesis } from '../../anamnesis/entities/anamnesis.entity';
import { Examination } from '../../examination/entities/examination.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { ConsultationHistoryStatus } from '@prisma/client';


export class ConsultationHistory {
    @ApiProperty({ description: 'Unique identifier for the consultation history' })
    id: number;

    @ApiProperty({ description: 'Diagnosis of the consultation' })
    diagnosis: string;

    @ApiProperty({ description: 'Prescription from the consultation' })
    prescription: string;

    @ApiProperty({ enum: ConsultationHistoryStatus, description: 'Status of the consultation history (open or closed)' })
    status: ConsultationHistoryStatus;

    @ApiProperty({ description: 'ID of the schedule associated with this consultation history' })
    scheduleId: number;

    @ApiProperty({ type: () => Schedule, description: 'The schedule associated with this consultation history', required: false })
    schedule?: Schedule;

    @ApiProperty({ type: () => Anamnesis, description: 'Anamnesis associated with this consultation history', required: false })
    anamnesis?: Anamnesis;

    @ApiProperty({ type: () => [Examination], description: 'Examinations associated with this consultation history', required: false })
    examinations?: Examination[];

    @ApiProperty({ description: 'Date when the consultation history was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the consultation history was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Indicates whether the consultation history is active', default: true })
    isActive: boolean;
}