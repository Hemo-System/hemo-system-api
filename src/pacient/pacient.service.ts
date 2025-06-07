import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacientDto } from './dto/create-pacient.dto';
import { UpdatePacientDto } from './dto/update-pacient.dto';
import { Pacient } from './entities/pacient.entity';
import { ProfessionalRole } from '@prisma/client';

@Injectable()
export class PacientService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPacientDto: CreatePacientDto, userRole: ProfessionalRole, userId: number): Promise<Pacient> {
    const { name, birthDate, sex, civilState, address, cpf, companionName, companionCpf } = createPacientDto;

    let data: {
      name: string;
      birthDate: Date;
      sex: string;
      civilState: string;
      address: string;
      cpf: string;
      companionName: string;
      companionCpf: string;
      adminId?: number;
      recepcionistId?: number;
    } = {
      name,
      birthDate: new Date(birthDate),
      sex,
      civilState,
      address,
      cpf,
      companionName,
      companionCpf,
    };

    // Definir quem está cadastrando o paciente
    if (userRole === ProfessionalRole.admin) {
      data.adminId = userId;
    } else if (userRole === ProfessionalRole.recepcionist) {
      data.recepcionistId = userId;
    }

    return await this.prisma.pacient.create({ data });
  }

  async findAll(): Promise<Pacient[]> {
    return await this.prisma.pacient.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<Pacient | null> {
    const pacient = await this.prisma.pacient.findUnique({ where: { id } });

    if (!pacient || !pacient.isActive) {
      return null;
    }

    return pacient;
  }

  async update(id: number, updatePacientDto: UpdatePacientDto): Promise<Pacient> {
    const pacient = await this.findOne(id);

    if (!pacient) {
      throw new Error('Pacient not found or inactive');
    }

    return await this.prisma.pacient.update({
      where: { id },
      data: updatePacientDto,
    });
  }

  async remove(id: number): Promise<Pacient> {
    const pacient = await this.findOne(id);

    if (!pacient) {
      throw new Error('Pacient not found or inactive');
    }

    return await this.prisma.pacient.update({
      where: { id },
      data: { isActive: false },
    });
  }
}