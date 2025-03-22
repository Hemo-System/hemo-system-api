import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthProfessionalService } from './health_professional.service';
import { CreateHealthProfessionalDto } from './dto/create-health_professional.dto';
import { UpdateHealthProfessionalDto } from './dto/update-health_professional.dto';

@Controller('health-professional')
export class HealthProfessionalController {
  constructor(private readonly healthProfessionalService: HealthProfessionalService) {}

  @Post()
  create(@Body() createHealthProfessionalDto: CreateHealthProfessionalDto) {
    return this.healthProfessionalService.create(createHealthProfessionalDto);
  }

  @Get()
  findAll() {
    return this.healthProfessionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthProfessionalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthProfessionalDto: UpdateHealthProfessionalDto) {
    return this.healthProfessionalService.update(+id, updateHealthProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthProfessionalService.remove(+id);
  }
}
