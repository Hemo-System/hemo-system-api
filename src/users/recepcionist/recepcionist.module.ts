import { Module } from '@nestjs/common';
import { RecepcionistService } from './recepcionist.service';
import { RecepcionistController } from './recepcionist.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecepcionistController],
  providers: [RecepcionistService],
  exports: [RecepcionistService],
})
export class RecepcionistModule {}
