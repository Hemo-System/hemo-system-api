import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ProfessionalRole } from '@prisma/client';

function handleWhoIsCreating(userRole: ProfessionalRole, userId: number) {
  let adminId: number | null = null;
  let recepcionistId: number | null = null;

  if (userRole === ProfessionalRole.admin) {
    adminId = userId;
  } else if (userRole === ProfessionalRole.recepcionist) {
    recepcionistId = userId;
  }

  return { adminId, recepcionistId };
}

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createScheduleDto: CreateScheduleDto, userRole: ProfessionalRole, userId: number): Promise<Schedule> {
    const { adminId, recepcionistId } = handleWhoIsCreating(userRole, userId);

    const data = {
      ...createScheduleDto,
      scheduleDateTime: new Date(createScheduleDto.scheduleDateTime),
      adminId,
      recepcionistId,
    }

    return this.prisma.schedule.create({ data });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({ where: { isActive: true } });
  }

  async findByPacient(pacientId: number): Promise<Schedule[]> {
    const pacient = await this.prisma.pacient.findUnique({
      where: { id: pacientId },
    });

    if (!pacient) {
      throw new NotFoundException(`Pacient with ID ${pacientId} not found.`);
    }

    return await this.prisma.schedule.findMany({
      where: {
        pacientId: pacient.id,
        isActive: true
      },
      orderBy: {
        scheduleDateTime: 'asc',
      },
    });

  }

  async findByHealthProfessional(healthProfessionalId: number): Promise<Schedule[]> {
    const professional = await this.prisma.healthProfessional.findUnique({
      where: { id: healthProfessionalId },
    });

    if (!professional) {
      throw new NotFoundException(`Health professional with ID ${healthProfessionalId} not found.`);
    }

    return await this.prisma.schedule.findMany({
      where: {
        healthProfessionalId,
        isActive: true,
      },
      orderBy: {
        scheduleDateTime: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });

    if (!schedule || !schedule.isActive) {
      return null;
    }

    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const schedule = await this.findOne(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found or inactive');
    }

    if (updateScheduleDto.scheduleDateTime) {
      updateScheduleDto.scheduleDateTime! = new Date(updateScheduleDto.scheduleDateTime);
    }

    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto
    });
  }

  async remove(id: number): Promise<Schedule> {
    const schedule = await this.findOne(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found or inactive');
    }

    return this.prisma.schedule.update({
      where: { id },
      data: { isActive: false },
    });
  }
}