import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ProfessionalRole } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createScheduleDto: CreateScheduleDto, userRole: ProfessionalRole, userId: number): Promise<Schedule> {
    let adminId: number | null = null;
    let recepcionistId: number | null = null;

    if (userRole === ProfessionalRole.admin) {
      adminId = userId;
    } else if (userRole === ProfessionalRole.recepcionist) {
      recepcionistId = userId;
    }

    const data = {
      ...createScheduleDto,
      scheduledDate: new Date(createScheduleDto.scheduledDate),
      adminId,
      recepcionistId,
    }

    return this.prisma.schedule.create({ data });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({ where: { isActive: true } });
  }

  async findByPacient(id: number): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({ where: { pacientId: id, isActive: true } });
  }

  async findByHealthProfessional(id: number): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({ where: { healthProfessionalId: id, isActive: true } });
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

    let updateData: any = {
      ...updateScheduleDto,
    };

    // Se está atualizando scheduledDate, converter para Date
    if (updateScheduleDto.scheduledDate) {
      updateData.scheduledDate = new Date(updateScheduleDto.scheduledDate);
    }

    return this.prisma.schedule.update({
      where: { id },
      data: updateData
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