import { Injectable } from '@nestjs/common';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';

@Injectable()
export class HealthProfessionalScaleService {
  create(createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto) {
    return 'This action adds a new healthProfessionalScale';
  }

  findAll() {
    return `This action returns all healthProfessionalScale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthProfessionalScale`;
  }

  update(id: number, updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto) {
    return `This action updates a #${id} healthProfessionalScale`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthProfessionalScale`;
  }
}
