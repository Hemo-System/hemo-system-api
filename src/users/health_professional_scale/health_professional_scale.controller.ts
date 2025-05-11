import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthProfessionalScaleService } from './health_professional_scale.service';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';

@Controller('health-professional-scale')
export class HealthProfessionalScaleController {
  constructor(private readonly healthProfessionalScaleService: HealthProfessionalScaleService) {}

  @Post()
  create(@Body() createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto) {
    return this.healthProfessionalScaleService.create(createHealthProfessionalScaleDto);
  }

  @Get()
  findAll() {
    return this.healthProfessionalScaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthProfessionalScaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto) {
    return this.healthProfessionalScaleService.update(+id, updateHealthProfessionalScaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthProfessionalScaleService.remove(+id);
  }
}
