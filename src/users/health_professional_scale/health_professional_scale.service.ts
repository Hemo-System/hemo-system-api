import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { DayOfWeek, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajuste o caminho se necessário
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';
import { HealthProfessionalScale } from './entities/health_professional_scale.entity';

@Injectable()
export class HealthProfessionalScaleService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Valida a lógica dos blocos de horário em um DTO.
   * Garante que pelo menos um turno (manhã ou tarde) seja fornecido
   * e que a hora de término seja após a hora de início para cada turno.
   * @param dto - O DTO de criação ou atualização da escala.
   */
  private validateTimeBlocks(dto: CreateHealthProfessionalScaleDto | UpdateHealthProfessionalScaleDto): void {
    const {
      startHourMorning,
      endHourMorning,
      startHourAfternoon,
      endHourAfternoon,
    } = dto;

    const hasMorningShift = startHourMorning && endHourMorning;
    const hasAfternoonShift = startHourAfternoon && endHourAfternoon;

    if (!hasMorningShift && !hasAfternoonShift) {
      throw new BadRequestException(
        'At least one shift (morning or afternoon) must be provided.',
      );
    }

    if (hasMorningShift && startHourMorning >= endHourMorning) {
      throw new BadRequestException('End time must be after start time for the morning shift.');
    }

    if (hasAfternoonShift && startHourAfternoon >= endHourAfternoon) {
      throw new BadRequestException('End time must be after start time for the afternoon shift.');
    }
  }

  /**
   * Verifica se a nova escala ou a atualização de uma escala existente
   * entra em conflito com outras escalas já cadastradas para o mesmo profissional.
   * A verificação é feita para o mesmo dia da semana e analisa sobreposição de datas.
   * @param dto - O DTO com os dados da escala.
   * @param scaleIdToIgnore - O ID da escala a ser ignorada na verificação (usado em atualizações).
   */
  private async validateScaleLogic(dto: Partial<CreateHealthProfessionalScaleDto | UpdateHealthProfessionalScaleDto>, scaleIdToIgnore?: number): Promise<void> {
    // 1. DETERMINAR O ESTADO FINAL DA ESCALA A SER VALIDADA
    let finalStartDate: Date;
    let finalFinishDate: Date;
    let finalDayOfWeek: DayOfWeek;
    let finalHealthProfessionalId: number;

    if (scaleIdToIgnore) {
      // --- CENÁRIO DE UPDATE ---
      const existingScale = await this.prisma.healthProfessionalScale.findUnique({ where: { id: scaleIdToIgnore } });

      if (!existingScale) {
        throw new NotFoundException(`Scale with ID ${scaleIdToIgnore} not found.`);
      }

      // Mescla os dados: usa o valor do DTO se ele for fornecido, senão, usa o valor existente no banco.
      finalStartDate = dto.startDate ?? existingScale.startDate;
      finalFinishDate = dto.finishDate ?? existingScale.finishDate;
      finalDayOfWeek = dto.dayOfWeek ?? existingScale.dayOfWeek;
      finalHealthProfessionalId = dto.healthProfessionalId ?? existingScale.healthProfessionalId;
    } else {
      // --- CENÁRIO DE CREATE ---
      if (!dto.startDate || !dto.finishDate || !dto.dayOfWeek || !dto.healthProfessionalId) {
        throw new BadRequestException('startDate, finishDate, dayOfWeek, and healthProfessionalId are required.');
      }

      finalStartDate = dto.startDate;
      finalFinishDate = dto.finishDate;
      finalDayOfWeek = dto.dayOfWeek;
      finalHealthProfessionalId = dto.healthProfessionalId;
    }

    // 2. EXECUTAR AS VALIDAÇÕES USANDO O ESTADO FINAL E COMPLETO
    if (finalStartDate >= finalFinishDate) {
      throw new BadRequestException('The finishDate must be after the startDate.');
    }

    const otherExistingScales = await this.prisma.healthProfessionalScale.findMany({
      where: {
        healthProfessionalId: finalHealthProfessionalId,
        dayOfWeek: finalDayOfWeek,
        isActive: true,
        id: scaleIdToIgnore ? { not: scaleIdToIgnore } : undefined,
      },
    });

    for (const otherScale of otherExistingScales) {
      const finalStartDateTimestamp = new Date(finalStartDate).getTime();
      const finalFinishDateTimestamp = new Date(finalFinishDate).getTime();
      const otherScaleStartTimestamp = new Date(otherScale.startDate).getTime();
      const otherScaleFinishTimestamp = new Date(otherScale.finishDate).getTime();

      const startsBeforeOtherEnds = finalStartDateTimestamp < otherScaleFinishTimestamp;
      const otherStartsBeforeItEnds = otherScaleStartTimestamp < finalFinishDateTimestamp;

      if (startsBeforeOtherEnds && otherStartsBeforeItEnds) {
        throw new ConflictException(`The proposed scale conflicts with an existing scale (ID: ${otherScale.id}).`);
      }
    }
  }

  async create(createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto, adminId: number): Promise<HealthProfessionalScale> {
    this.validateTimeBlocks(createHealthProfessionalScaleDto);
    await this.validateScaleLogic(createHealthProfessionalScaleDto);

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

    // A lógica de validação e verificação de conflito é reaproveitada aqui.
    this.validateTimeBlocks(updateHealthProfessionalScaleDto);
    await this.validateScaleLogic(updateHealthProfessionalScaleDto, id);

    const { startDate, finishDate, ...rest } = updateHealthProfessionalScaleDto;

    return await this.prisma.healthProfessionalScale.update({
      where: { id },
      data: {
        ...rest,
        startDate: startDate ? new Date(startDate) : undefined,
        finishDate: finishDate ? new Date(finishDate) : undefined,
      },
    });
  }


  async remove(id: number): Promise<HealthProfessionalScale> {
    const scale = await this.prisma.healthProfessionalScale.findUnique({ where: { id } });

    if (!scale) {
      throw new NotFoundException(`Scale with ID ${id} not found.`);
    }

    // Verificar se existem agendamentos futuros.
    const futureSchedulesCount = await this.prisma.schedule.count({
      where: {
        healthProfessionalScaleId: id,
        scheduleDateTime: { gte: new Date() }, // Agendamentos a partir de agora
        status: { notIn: ['cancelled', 'completed'] }, // Que não estejam cancelados ou finalizados
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