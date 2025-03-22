import { Injectable } from '@nestjs/common';
import { CreateRecepcionistDto } from './dto/create-recepcionist.dto';
import { UpdateRecepcionistDto } from './dto/update-recepcionist.dto';

@Injectable()
export class RecepcionistService {
  create(createRecepcionistDto: CreateRecepcionistDto) {
    return 'This action adds a new recepcionist';
  }

  findAll() {
    return `This action returns all recepcionist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recepcionist`;
  }

  update(id: number, updateRecepcionistDto: UpdateRecepcionistDto) {
    return `This action updates a #${id} recepcionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} recepcionist`;
  }
}
