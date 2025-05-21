import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PacientModule } from 'src/pacient/pacient.module';
import { HealthProfessional } from 'src/users/health_professional/entities/health_professional.entity';
import { HealthProfessionalModule } from 'src/users/health_professional/health_professional.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PacientModule, HealthProfessionalModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule { }
