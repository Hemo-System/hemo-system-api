import { Module } from '@nestjs/common';
import { InfermaryAdmissionService } from './infermary_admission.service';
import { InfermaryAdmissionController } from './infermary_admission.controller';

@Module({
  controllers: [InfermaryAdmissionController],
  providers: [InfermaryAdmissionService],
  exports: [InfermaryAdmissionService],
})
export class InfermaryAdmissionModule { }
