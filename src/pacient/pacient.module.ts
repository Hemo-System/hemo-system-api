import { Module } from '@nestjs/common';
import { PacientService } from './pacient.service';
import { PacientController } from './pacient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PacientController],
  providers: [PacientService],
  exports: [PacientService],
})
export class PacientModule { }
