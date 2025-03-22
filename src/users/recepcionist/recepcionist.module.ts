import { Module } from '@nestjs/common';
import { RecepcionistService } from './recepcionist.service';
import { RecepcionistController } from './recepcionist.controller';

@Module({
  controllers: [RecepcionistController],
  providers: [RecepcionistService],
})
export class RecepcionistModule {}
