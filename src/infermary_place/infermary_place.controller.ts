import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfermaryPlaceService } from './infermary_place.service';
import { CreateInfermaryPlaceDto } from './dto/create-infermary_place.dto';
import { UpdateInfermaryPlaceDto } from './dto/update-infermary_place.dto';

@Controller('infermary-place')
export class InfermaryPlaceController {
  constructor(private readonly infermaryPlaceService: InfermaryPlaceService) {}

  @Post()
  create(@Body() createInfermaryPlaceDto: CreateInfermaryPlaceDto) {
    return this.infermaryPlaceService.create(createInfermaryPlaceDto);
  }

  @Get()
  findAll() {
    return this.infermaryPlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infermaryPlaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfermaryPlaceDto: UpdateInfermaryPlaceDto) {
    return this.infermaryPlaceService.update(+id, updateInfermaryPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infermaryPlaceService.remove(+id);
  }
}
