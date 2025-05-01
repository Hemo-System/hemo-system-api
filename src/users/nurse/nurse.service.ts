import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { Nurse } from './entities/nurse.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NurseService {
  constructor(private readonly prisma: PrismaService) { }

  create(createNurseDto: CreateNurseDto, adminId: number): Promise<Nurse> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Nurse[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<Nurse | null> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<Nurse | null> {
    throw new Error('Method not implemented.');
  }

  update(id: number, updateNurseDto: UpdateNurseDto): Promise<Nurse> {
    throw new Error('Method not implemented.');
  }

  remove(id: number): Promise<Nurse> {
    throw new Error('Method not implemented.');
  }
}
