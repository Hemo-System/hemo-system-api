import { Injectable } from '@nestjs/common';
import { CreateRecepcionistDto } from './dto/create-recepcionist.dto';
import { UpdateRecepcionistDto } from './dto/update-recepcionist.dto';
import { Recepcionist } from './entities/recepcionist.entity';

@Injectable()
export class RecepcionistService {
  create(createRecepcionistDto: CreateRecepcionistDto) {
    return 'This action adds a new recepcionist';
  }

  findAll() {
    return `This action returns all recepcionist`;
  }

  findOne(id: number): Promise<Recepcionist | null> {
    return Promise.resolve(null);
  }

  findByEmail(email: string): Promise<Recepcionist | null> {
    return Promise.resolve(null);
  }

  update(id: number, updateRecepcionistDto: UpdateRecepcionistDto) {
    return `This action updates a #${id} recepcionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} recepcionist`;
  }
}
