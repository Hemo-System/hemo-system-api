import { Injectable } from '@nestjs/common';
import { CreateConsultationHistoryDto } from './dto/create-consultation_history.dto';
import { UpdateConsultationHistoryDto } from './dto/update-consultation_history.dto';

@Injectable()
export class ConsultationHistoryService {
  create(createConsultationHistoryDto: CreateConsultationHistoryDto) {
    return 'This action adds a new consultationHistory';
  }

  findAll() {
    return `This action returns all consultationHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultationHistory`;
  }

  update(
    id: number,
    updateConsultationHistoryDto: UpdateConsultationHistoryDto,
  ) {
    return `This action updates a #${id} consultationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultationHistory`;
  }
}
