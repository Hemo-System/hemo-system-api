import { Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from './dto/create_health_professional.dto';
import { UpdateHealthProfessionalDto } from './dto/update_health_professional.dto';

@Injectable()
export class HealthProfessionalService {
  create(createHealthProfessionalDto: CreateHealthProfessionalDto) {
    return 'This action adds a new healthProfessional';
  }

  findAll() {
    return `This action returns all healthProfessional`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthProfessional`;
  }

  update(id: number, updateHealthProfessionalDto: UpdateHealthProfessionalDto) {
    return `This action updates a #${id} healthProfessional`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthProfessional`;
  }
}
