import { PartialType } from '@nestjs/swagger';
import { CreateRecepcionistDto } from './create-recepcionist.dto';

export class UpdateRecepcionistDto extends PartialType(CreateRecepcionistDto) { }