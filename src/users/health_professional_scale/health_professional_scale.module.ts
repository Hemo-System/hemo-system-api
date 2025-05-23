import { Module } from '@nestjs/common';
import { HealthProfessionalScaleService } from './health_professional_scale.service';
import { HealthProfessionalScaleController } from './health_professional_scale.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealthProfessionalScaleController],
  providers: [HealthProfessionalScaleService],
})
export class HealthProfessionalScaleModule { }
