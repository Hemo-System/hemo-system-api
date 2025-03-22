import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './users/admin/admin.module';
import { RecepcionistModule } from './users/recepcionist/recepcionist.module';
import { HealthProfessionalModule } from './users/health_professional/health_professional.module';
import { NurseModule } from './users/nurse/nurse.module';
import { PacientModule } from './pacient/pacient.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConsultationHistoryModule } from './consultation_history/consultation_history.module';

@Module({
  imports: [AdminModule, RecepcionistModule, HealthProfessionalModule, NurseModule, PacientModule, ScheduleModule, ConsultationHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
