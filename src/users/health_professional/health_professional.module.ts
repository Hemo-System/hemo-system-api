import { Module } from '@nestjs/common';
import { HealthProfessionalService } from './health_professional.service';
import { HealthProfessionalController } from './health_professional.controller';

@Module({
  controllers: [HealthProfessionalController],
  providers: [HealthProfessionalService],
})
export class HealthProfessionalModule {}
