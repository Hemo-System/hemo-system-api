import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { UpdateAnamnesisDto } from './dto/update-anamnesis.dto';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Post()
  create(@Body() createAnamnesisDto: CreateAnamnesisDto) {
    return this.anamnesisService.create(createAnamnesisDto);
  }

  @Get()
  findAll() {
    return this.anamnesisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anamnesisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnamnesisDto: UpdateAnamnesisDto) {
    return this.anamnesisService.update(+id, updateAnamnesisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anamnesisService.remove(+id);
  }
}
