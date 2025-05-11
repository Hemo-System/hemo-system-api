import { Injectable } from '@nestjs/common';
import { CreateInfermaryPlaceDto } from './dto/create-infermary_place.dto';
import { UpdateInfermaryPlaceDto } from './dto/update-infermary_place.dto';

@Injectable()
export class InfermaryPlaceService {
  create(createInfermaryPlaceDto: CreateInfermaryPlaceDto) {
    return 'This action adds a new infermaryPlace';
  }

  findAll() {
    return `This action returns all infermaryPlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infermaryPlace`;
  }

  update(id: number, updateInfermaryPlaceDto: UpdateInfermaryPlaceDto) {
    return `This action updates a #${id} infermaryPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} infermaryPlace`;
  }
}
