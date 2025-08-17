import { PartialType } from '@nestjs/swagger';
import { CreateHealthProfessionalScaleDto } from './create-health_professional_scale.dto';

export class UpdateHealthProfessionalScaleDto extends PartialType(CreateHealthProfessionalScaleDto) {}
