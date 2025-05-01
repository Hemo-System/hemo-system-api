import { Module } from '@nestjs/common';
import { HealthProfessionalService } from './health_professional.service';
import { HealthProfessionalController } from './health_professional.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealthProfessionalController],
  providers: [HealthProfessionalService],
  exports: [HealthProfessionalService],
})
export class HealthProfessionalModule {}
