import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';
import { HealthProfessionalScale } from './entities/health_professional_scale.entity';

@Injectable()
export class HealthProfessionalScaleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto, adminId: number): Promise<HealthProfessionalScale> {
    const { start, exit, isPlantonist, healthProfessionalId } = createHealthProfessionalScaleDto;

    // Ensure startHour is earlier than exitHour
    if (start >= exit) {
      throw new Error('Start hour must be earlier than exit hour');
    }

    // Check for overlapping schedules
    const overlappingScale = await this.prisma.healthProfessionalScale.findFirst({
      where: {
        healthProfessionalId,
        OR: [
          {
            start: { lte: exit },
            exit: { gte: start },
          },
        ],
      },
    });

    if (overlappingScale) {
      throw new Error('There is already a scale overlapping this time');
    }

    // Create the scale
    return this.prisma.healthProfessionalScale.create({
      data: {
        start: start ? new Date(start) : undefined,
        exit: exit ? new Date(exit) : undefined,
        isPlantonist,
        healthProfessionalId,
        adminId,
      },
      include: {
        healthProfessional: {
          select: {
            id: true,
            name: true,
            email: true,
            specialty: true,
            professionalRegister: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<HealthProfessionalScale[]> {
    return this.prisma.healthProfessionalScale.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number) {
    const scale = await this.prisma.healthProfessionalScale.findUnique({
      where: { id },
    });

    if (!scale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    return scale;
  }

  async update(id: number, updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto): Promise<HealthProfessionalScale> {
    const { start, exit, isPlantonist } = updateHealthProfessionalScaleDto;

    // Ensure the scale exists
    const existingScale = await this.prisma.healthProfessionalScale.findUnique({
      where: { id },
    });

    if (!existingScale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    // Ensure startHour is earlier than exitHour
    if (start && exit) {
      if (start >= exit) {
        throw new Error('Start hour must be earlier than exit hour');
      }
    }

    // Update the scale
    return this.prisma.healthProfessionalScale.update({
      where: { id },
      data: {
        start: start ? new Date(start) : undefined,
        exit: exit ? new Date(exit) : undefined,
        isPlantonist,
      },
    });
  }

  async remove(id: number): Promise<HealthProfessionalScale> {
    const existingScale = await this.prisma.healthProfessionalScale.findUnique({ where: { id } });

    if (!existingScale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    // Soft delete by setting isActive to false
    return this.prisma.healthProfessionalScale.update({
      where: { id },
      data: { isActive: false },
    });
  }
}