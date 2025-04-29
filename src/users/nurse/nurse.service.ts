import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { Nurse } from './entities/nurse.entity';

@Injectable()
export class NurseService {
  create(createNurseDto: CreateNurseDto) {
    return 'This action adds a new nurse';
  }

  findAll() {
    return `This action returns all nurse`;
  }

  findOne(id: number): Promise<Nurse | null> {
    return Promise.resolve(null);
  }

  findByEmail(email: string): Promise<Nurse> {
    throw new Error('Method not implemented.');
  }

  update(id: number, updateNurseDto: UpdateNurseDto) {
    return `This action updates a #${id} nurse`;
  }

  remove(id: number) {
    return `This action removes a #${id} nurse`;
  }
}
