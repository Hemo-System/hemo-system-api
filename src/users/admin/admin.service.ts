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
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      return Promise.resolve(null);
    }

    return admin;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return Promise.resolve(null);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    return await this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number): Promise<Admin> {
    const user = await this.findOne(id);

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
