import { Injectable } from '@nestjs/common';
import { CreateHealthProfessionalDto } from './dto/create_health_professional.dto';
import { UpdateHealthProfessionalDto } from './dto/update_health_professional.dto';
import { HealthProfessional } from './entities/health_professional.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HealthProfessionalService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHealthProfessionalDto: CreateHealthProfessionalDto, adminId: number): Promise<HealthProfessional> {
    const data = {
      ...createHealthProfessionalDto,
      password: await bcrypt.hash(createHealthProfessionalDto.password, 10),
      adminId: adminId,
    };

    return await this.prisma.healthProfessional.create({ data });
  }

  async findAll(): Promise<HealthProfessional[]> {
    return await this.prisma.healthProfessional.findMany();
  }

  async findOne(id: number): Promise<HealthProfessional | null> {
    const healthProfessional = await this.prisma.healthProfessional.findUnique({ where: { id } });

    if (!healthProfessional) {
      return Promise.resolve(null);
    }

    return healthProfessional;
  }

  async findByEmail(email: string): Promise<HealthProfessional | null> {
    const healthProfessional = await this.prisma.healthProfessional.findUnique({ where: { email } });

    if (!healthProfessional) {
      return Promise.resolve(null);
    }

    return healthProfessional;
  }

  async update(id: number, updateHealthProfessionalDto: UpdateHealthProfessionalDto): Promise<HealthProfessional> {
    if (updateHealthProfessionalDto.password) {
      updateHealthProfessionalDto.password = await bcrypt.hash(updateHealthProfessionalDto.password, 10);
    }

    return await this.prisma.healthProfessional.update({
      where: { id },
      data: updateHealthProfessionalDto,
    });
  }

  async remove(id: number): Promise<HealthProfessional> {
    const user = await this.findOne(id);

    const data = {
      ...user,
      isActive: false,
    };

    return this.prisma.healthProfessional.update({
      where: { id },
      data: data,
    });
  }
}
