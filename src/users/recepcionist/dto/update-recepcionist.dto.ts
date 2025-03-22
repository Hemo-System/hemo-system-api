import { PartialType } from '@nestjs/mapped-types';
import { CreateRecepcionistDto } from './create-recepcionist.dto';

export class UpdateRecepcionistDto extends PartialType(CreateRecepcionistDto) {}
