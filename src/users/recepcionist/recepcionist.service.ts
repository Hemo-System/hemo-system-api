import { Injectable } from '@nestjs/common';
import { CreateRecepcionistDto } from './dto/create-recepcionist.dto';
import { UpdateRecepcionistDto } from './dto/update-recepcionist.dto';
import { Recepcionist } from './entities/recepcionist.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecepcionistService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRecepcionistDto: CreateRecepcionistDto, adminId: number): Promise<Recepcionist> {
    const data = {
      ...createRecepcionistDto,
      password: await bcrypt.hash(createRecepcionistDto.password, 10),
      adminId: adminId,
    };

    return await this.prisma.recepcionist.create({ data });
  }

  async findAll(): Promise<Recepcionist[]> {
    return await this.prisma.recepcionist.findMany();
  }

  async findOne(id: number): Promise<Recepcionist | null> {
    const recepcionist = await this.prisma.recepcionist.findUnique({ where: { id } });

    if (!recepcionist) {
      return Promise.resolve(null);
    }

    return recepcionist;
  }

  async findByEmail(email: string): Promise<Recepcionist | null> {
    const recepcionist = await this.prisma.recepcionist.findUnique({ where: { email } });

    if (!recepcionist) {
      return Promise.resolve(null);
    }

    return recepcionist;
  }

  async update(id: number, updateRecepcionistDto: UpdateRecepcionistDto): Promise<Recepcionist> {
    if (updateRecepcionistDto.password) {
      updateRecepcionistDto.password = await bcrypt.hash(updateRecepcionistDto.password, 10);
    }

    return await this.prisma.recepcionist.update({
      where: { id },
      data: updateRecepcionistDto,
    });
  }

  async remove(id: number): Promise<Recepcionist> {
    const user = await this.findOne(id);

    const data = {
      ...user,
      isActive: false,
    };

    return this.prisma.recepcionist.update({
      where: { id },
      data: data,
    });
  }
}
