import { Injectable } from '@nestjs/common';
import { CreateInfermaryAdmissionDto } from './dto/create-infermary_admission.dto';
import { UpdateInfermaryAdmissionDto } from './dto/update-infermary_admission.dto';

@Injectable()
export class InfermaryAdmissionService {
  create(createInfermaryAdmissionDto: CreateInfermaryAdmissionDto) {
    return 'This action adds a new infermaryAdmission';
  }

  findAll() {
    return `This action returns all infermaryAdmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infermaryAdmission`;
  }

  update(id: number, updateInfermaryAdmissionDto: UpdateInfermaryAdmissionDto) {
    return `This action updates a #${id} infermaryAdmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} infermaryAdmission`;
  }
}
