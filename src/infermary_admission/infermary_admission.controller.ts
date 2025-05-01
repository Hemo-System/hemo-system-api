import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InfermaryAdmissionService } from './infermary_admission.service';
import { CreateInfermaryAdmissionDto } from './dto/create-infermary_admission.dto';
import { UpdateInfermaryAdmissionDto } from './dto/update-infermary_admission.dto';

@Controller('infermary-admission')
export class InfermaryAdmissionController {
  constructor(
    private readonly infermaryAdmissionService: InfermaryAdmissionService,
  ) {}

  @Post()
  create(@Body() createInfermaryAdmissionDto: CreateInfermaryAdmissionDto) {
    return this.infermaryAdmissionService.create(createInfermaryAdmissionDto);
  }

  @Get()
  findAll() {
    return this.infermaryAdmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infermaryAdmissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInfermaryAdmissionDto: UpdateInfermaryAdmissionDto,
  ) {
    return this.infermaryAdmissionService.update(
      +id,
      updateInfermaryAdmissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infermaryAdmissionService.remove(+id);
  }
}
