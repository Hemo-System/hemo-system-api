import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ConsultationHistoryStatus } from '@prisma/client';

export class CreateConsultationHistoryDto {
    @ApiProperty({ description: 'Diagnosis of the consultation', example: 'Febre e dor de cabeça' })
    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @ApiProperty({ description: 'Prescription from the consultation', example: 'Dipirona 500mg a cada 6 horas e repouso.' })
    @IsString()
    @IsNotEmpty()
    prescription: string;

    @ApiProperty({
        enum: ConsultationHistoryStatus,
        description: 'Status of the consultation history',
        example: ConsultationHistoryStatus.open,
        default: ConsultationHistoryStatus.open,
    })
    @IsEnum(ConsultationHistoryStatus)
    @IsNotEmpty()
    status: ConsultationHistoryStatus;

    @ApiProperty({ description: 'ID of the schedule associated with this consultation history', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    scheduleId: number;
}