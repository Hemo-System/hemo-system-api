import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProfessionalRole } from '@prisma/client';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) { }

  async create(createScheduleDto: CreateScheduleDto, userRole: ProfessionalRole, userId: number): Promise<Schedule> {
    const { pacientId, healthPrefessionalId } = createScheduleDto;

    // Check if the pacient exists
    const pacient = await this.prisma.pacient.findUnique({ where: { id: pacientId } });
    if (!pacient) {
      throw new NotFoundException(`Pacient with ID ${pacientId} not found`);
    }

    // Check if the professional exists
    const healthProfessional = await this.prisma.healthProfessional.findUnique({ where: { id: healthPrefessionalId } });
    if (!healthProfessional) {
      throw new NotFoundException(`Professional with ID ${healthPrefessionalId} not found`);
    }

    let data = {
      ...createScheduleDto,
      date: new Date(createScheduleDto.date),
    };

    if (userRole === ProfessionalRole.admin) {
      data.adminId = userId;
    } else if (userRole === ProfessionalRole.recepcionist) {
      data.recepcionistId = userId;
    }

    return await this.prisma.schedule.create({ data });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({
      where: { isActive: true },
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
    // Check if schedule exists
    await this.findOne(id);

    const { pacientId, healthPrefessionalId, ...rest } = updateScheduleDto;

    // Prepare the data object
    const data: any = { ...rest };

    // Add relations if provided
    if (pacientId) {
      data.pacient = { connect: { id: pacientId } };
    }

    if (healthPrefessionalId) {
      data.professional = { connect: { id: healthPrefessionalId } };
    }

    if (rest.date) {
      data.date = new Date(rest.date);
    }

    return this.prisma.schedule.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Schedule> {
    const schedule = await this.findOne(id);

    if (!schedule) {
      throw new Error('Schedule not found or inactive');
    }

    return await this.prisma.schedule.update({
      where: { id },
      data: { isActive: false },
    });
  }
}