import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';
import { HealthProfessionalScale } from './entities/health_professional_scale.entity';

@Injectable()
export class HealthProfessionalScaleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto, adminId: number): Promise<HealthProfessionalScale> {
    return await this.prisma.healthProfessionalScale.create({
      data: {
        ...createHealthProfessionalScaleDto,
        adminId,
      },
    });
  }

  async findAll(): Promise<HealthProfessionalScale[]> {
    return await this.prisma.healthProfessionalScale.findMany({
      where: { isActive: true },
      orderBy: {
        healthProfessionalId: 'asc',
      },
    });
  }

  async findByHealthProfessional(healthProfessionalId: number): Promise<HealthProfessionalScale[]> {
    const professional = await this.prisma.healthProfessional.findUnique({
      where: { id: healthProfessionalId },
    });

    if (!professional) {
      throw new NotFoundException(`Health professional with ID ${healthProfessionalId} not found.`);
    }

    return await this.prisma.healthProfessionalScale.findMany({
      where: {
        healthProfessionalId,
        isActive: true,
      },
      orderBy: {
        dayOfWeek: 'asc',
      },
    });
  }


  async update(id: number, updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto): Promise<HealthProfessionalScale> {
    const scale = await this.prisma.healthProfessionalScale.findUnique({
      where: { id },
    });

    if (!scale) {
      throw new NotFoundException(`Scale with ID ${id} not found.`);
    }

    if (updateHealthProfessionalScaleDto.startDate) {
      updateHealthProfessionalScaleDto.startDate! = new Date(updateHealthProfessionalScaleDto.startDate);
    }

    if (updateHealthProfessionalScaleDto.finishDate) {
      updateHealthProfessionalScaleDto.finishDate! = new Date(updateHealthProfessionalScaleDto.finishDate);
    }

    return await this.prisma.healthProfessionalScale.update({
      where: { id },
      data: updateHealthProfessionalScaleDto,
    });
  }


  async remove(id: number): Promise<HealthProfessionalScale> {
    const scale = await this.prisma.healthProfessionalScale.findUnique({ where: { id } });

    if (!scale) {
      throw new NotFoundException(`Scale with ID ${id} not found.`);
    }

    const futureSchedulesCount = await this.prisma.schedule.count({
      where: {
        healthProfessionalScaleId: id,
        scheduleDateTime: { gte: new Date() },
        status: { notIn: ['cancelled', 'completed'] },
      },
    });

    if (futureSchedulesCount > 0) {
      throw new ForbiddenException(
        `Cannot remove scale with ID ${id} because it has ${futureSchedulesCount} future appointments. Please reschedule or cancel them first.`,
      );
    }

    return this.prisma.healthProfessionalScale.update({
      where: { id },
      data: { isActive: false },
    });
  }
}