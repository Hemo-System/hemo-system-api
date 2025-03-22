import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultationHistoryService } from './consultation_history.service';
import { CreateConsultationHistoryDto } from './dto/create-consultation_history.dto';
import { UpdateConsultationHistoryDto } from './dto/update-consultation_history.dto';

@Controller('consultation-history')
export class ConsultationHistoryController {
  constructor(private readonly consultationHistoryService: ConsultationHistoryService) {}

  @Post()
  create(@Body() createConsultationHistoryDto: CreateConsultationHistoryDto) {
    return this.consultationHistoryService.create(createConsultationHistoryDto);
  }

  @Get()
  findAll() {
    return this.consultationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultationHistoryDto: UpdateConsultationHistoryDto) {
    return this.consultationHistoryService.update(+id, updateConsultationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationHistoryService.remove(+id);
  }
}
