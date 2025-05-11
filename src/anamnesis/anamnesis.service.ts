import { Injectable } from '@nestjs/common';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';

@Injectable()
export class AnamnesisService {
  create(createAnamnesisDto: CreateAnamnesisDto) {
    return 'This action adds a new anamnesis';
  }

  findAll() {
    return `This action returns all anamnesis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anamnesis`;
  }

  update(id: number, updateAnamnesisDto: UpdateAnamnesisDto) {
    return `This action updates a #${id} anamnesis`;
  }

  remove(id: number) {
    return `This action removes a #${id} anamnesis`;
  }
}
