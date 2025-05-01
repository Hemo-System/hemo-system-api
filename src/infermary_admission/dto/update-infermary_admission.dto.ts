import { PartialType } from '@nestjs/mapped-types';
import { CreateInfermaryAdmissionDto } from './create-infermary_admission.dto';

export class UpdateInfermaryAdmissionDto extends PartialType(
  CreateInfermaryAdmissionDto,
) {}
