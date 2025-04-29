import { Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from './dto/create_health_professional.dto';
import { UpdateHealthProfessionalDto } from './dto/update_health_professional.dto';
import { HealthProfessional } from './entities/health_professional.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthProfessionalService {
  constructor(private readonly prisma: PrismaService) { }

  create(createHealthProfessionalDto: CreateHealthProfessionalDto) {
    return 'This action adds a new healthProfessional';
  }

  findAll() {
    return `This action returns all healthProfessional`;
  }

  findOne(id: number): Promise<HealthProfessional | null> {
    return Promise.resolve({
      id: 1,
      role: 'healthProfessional',
      name: 'Health Professional',
      email: 'email',
      password: '123456',
      specialty: 'Cardiology',
      professionalRegister: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
  }

  findByEmail(email: string): Promise<HealthProfessional | null> {
    return Promise.resolve({
      id: 1,
      role: 'healthProfessional',
      name: 'Health Professional',
      email: 'email',
      password: '123456',
      specialty: 'Cardiology',
      professionalRegister: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
  }

  update(id: number, updateHealthProfessionalDto: UpdateHealthProfessionalDto) {
    return `This action updates a #${id} healthProfessional`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthProfessional`;
  }
}
