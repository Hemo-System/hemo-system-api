import { Module } from '@nestjs/common';
import { InfermaryPlaceService } from './infermary_place.service';
import { InfermaryPlaceController } from './infermary_place.controller';

@Module({
  controllers: [InfermaryPlaceController],
  providers: [InfermaryPlaceService],
})
export class InfermaryPlaceModule {}
