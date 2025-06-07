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

    // Definir quem está cadastrando o agendamento
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

    return this.prisma.schedule.create({
      data,
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
        pacient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            sex: true,
            birthDate: true,
            companionName: true,
            companionCpf: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
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
        pacient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            sex: true,
            birthDate: true,
            companionName: true,
            companionCpf: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
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
        pacient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            sex: true,
            birthDate: true,
            companionName: true,
            companionCpf: true,
          },
        },
      },
    });

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
      data: updateData,
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
        pacient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            sex: true,
            birthDate: true,
            companionName: true,
            companionCpf: true,
          },
        },
      }
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
        pacient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            sex: true,
            birthDate: true,
            companionName: true,
            companionCpf: true,
          },
        },
      },
    });
  }
}