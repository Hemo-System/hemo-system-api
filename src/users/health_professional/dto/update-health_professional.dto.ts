import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthProfessionalDto } from './create-health_professional.dto';

export class UpdateHealthProfessionalDto extends PartialType(CreateHealthProfessionalDto) {}
