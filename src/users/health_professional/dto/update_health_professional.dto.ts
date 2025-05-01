import { PartialType } from '@nestjs/swagger';
import { CreateHealthProfessionalDto } from './create_health_professional.dto';

export class UpdateHealthProfessionalDto extends PartialType(
  CreateHealthProfessionalDto,
) {}
