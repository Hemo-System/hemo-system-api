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
import { InfermaryAdmissionModule } from './infermary_admission/infermary_admission.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './resource/resource.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';
import { InfermaryPlaceModule } from './infermary_place/infermary_place.module';
import { ExaminationModule } from './examination/examination.module';
import { HealthProfessionalScaleModule } from './users/health_professional_scale/health_professional_scale.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminModule,
    RecepcionistModule,
    HealthProfessionalModule,
    NurseModule,
    PacientModule,
    ScheduleModule,
    ConsultationHistoryModule,
    InfermaryAdmissionModule,
    ResourceModule,
    AnamnesisModule,
    InfermaryPlaceModule,
    ExaminationModule,
    HealthProfessionalScaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
