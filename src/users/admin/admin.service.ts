import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const data = {
      ...createAdminDto,
      password: await bcrypt.hash(createAdminDto.password, 10),
    };

    return await this.prisma.admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return await this.prisma.admin.findMany({ where: { isActive: true } });
  }

  findOne(id: number): Promise<Admin | null> {
    return this.prisma.admin.findUnique({ where: { id, isActive: true } });
  }

  findByEmail(email: string): Promise<Admin | null> {
    return this.prisma.admin.findUnique({ where: { email, isActive: true } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.prisma.admin.update({
      where: { id, isActive: true },
      data: updateAdminDto,
    });
  }

  async remove(id: number): Promise<Admin> {
    let user = await this.findOne(id);

    const data = {
      ...user,
      isActive: false,
    };

    return this.prisma.admin.update({
      where: { id },
      data: data,
    });
  }
}
