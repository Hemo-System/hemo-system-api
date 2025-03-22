import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationHistoryDto } from './create-consultation_history.dto';

export class UpdateConsultationHistoryDto extends PartialType(CreateConsultationHistoryDto) {}
