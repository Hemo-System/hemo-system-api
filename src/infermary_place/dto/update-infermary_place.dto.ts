import { PartialType } from '@nestjs/swagger';
import { CreateInfermaryPlaceDto } from './create-infermary_place.dto';

export class UpdateInfermaryPlaceDto extends PartialType(CreateInfermaryPlaceDto) {}
