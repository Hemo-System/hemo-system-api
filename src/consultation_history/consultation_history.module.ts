import { Module } from '@nestjs/common';
import { ConsultationHistoryService } from './consultation_history.service';
import { ConsultationHistoryController } from './consultation_history.controller';

@Module({
  controllers: [ConsultationHistoryController],
  providers: [ConsultationHistoryService],
  exports: [ConsultationHistoryService],
})
export class ConsultationHistoryModule {}
