import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { Nurse } from './entities/nurse.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NurseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNurseDto: CreateNurseDto, adminId: number): Promise<Nurse> {
    const data = {
      ...createNurseDto,
      password: await bcrypt.hash(createNurseDto.password, 10),
      adminId: adminId,
    };

    return await this.prisma.nurse.create({ data });
  }

  async findAll(): Promise<Nurse[]> {
    return await this.prisma.nurse.findMany();
  }

  async findOne(id: number): Promise<Nurse | null> {
    const nurse = await this.prisma.nurse.findUnique({ where: { id } });

    if (!nurse) {
      return Promise.resolve(null);
    }

    return nurse;
  }

  async findByEmail(email: string): Promise<Nurse | null> {
    const nurse = await this.prisma.nurse.findUnique({ where: { email } });

    if (!nurse) {
      return Promise.resolve(null);
    }

    return nurse;
  }

  async update(id: number, updateNurseDto: UpdateNurseDto): Promise<Nurse> {
    return await this.prisma.nurse.update({
      where: { id },
      data: updateNurseDto,
    });
  }

  async remove(id: number): Promise<Nurse> {
    const user = await this.findOne(id);

    const data = {
      ...user,
      isActive: false,
    };

    return this.prisma.nurse.update({
      where: { id },
      data: data,
    });
  }
}
