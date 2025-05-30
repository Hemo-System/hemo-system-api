import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';
import { HealthProfessionalScale } from './entities/health_professional_scale.entity';

@Injectable()
export class HealthProfessionalScaleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto, adminId: number): Promise<HealthProfessionalScale> {
    const { date, startTime, endTime, isPlantonist, healthProfessionalId } = createHealthProfessionalScaleDto;

    // Ensure startTime is earlier than endTime
    if (startTime >= endTime) {
      throw new Error('Start time must be earlier than end time');
    }

    // Check for overlapping schedules on the same date
    const overlappingScale = await this.prisma.healthProfessionalScale.findFirst({
      where: {
        healthProfessionalId,
        date: new Date(date),
        isActive: true,
        OR: [
          {
            AND: [
              { startTime: { lte: endTime } },
              { endTime: { gte: startTime } },
            ],
          },
        ],
      },
    });

    if (overlappingScale) {
      throw new Error('There is already a scale overlapping this time on this date');
    }

    // Create the scale
    return this.prisma.healthProfessionalScale.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
        isPlantonist: isPlantonist ?? false,
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

  async findOne(id: number) {
    const scale = await this.prisma.healthProfessionalScale.findUnique({
      where: { id },
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

    if (!scale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    return scale;
  }

  async update(id: number, updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto): Promise<HealthProfessionalScale> {
    const { date, startTime, endTime, isPlantonist } = updateHealthProfessionalScaleDto;

    // Ensure the scale exists
    const existingScale = await this.prisma.healthProfessionalScale.findUnique({
      where: { id },
    });

    if (!existingScale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    // Ensure startTime is earlier than endTime
    if (startTime && endTime) {
      if (startTime >= endTime) {
        throw new Error('Start time must be earlier than end time');
      }
    }

    // Update the scale
    return this.prisma.healthProfessionalScale.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        startTime,
        endTime,
        isPlantonist,
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

  async remove(id: number): Promise<HealthProfessionalScale> {
    const existingScale = await this.prisma.healthProfessionalScale.findUnique({ where: { id } });

    if (!existingScale) {
      throw new NotFoundException(`HealthProfessionalScale with ID ${id} not found`);
    }

    // Soft delete by setting isActive to false
    return this.prisma.healthProfessionalScale.update({
      where: { id },
      data: { isActive: false },
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
}