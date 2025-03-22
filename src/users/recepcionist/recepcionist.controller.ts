import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecepcionistService } from './recepcionist.service';
import { CreateRecepcionistDto } from './dto/create-recepcionist.dto';
import { UpdateRecepcionistDto } from './dto/update-recepcionist.dto';

@Controller('recepcionist')
export class RecepcionistController {
  constructor(private readonly recepcionistService: RecepcionistService) {}

  @Post()
  create(@Body() createRecepcionistDto: CreateRecepcionistDto) {
    return this.recepcionistService.create(createRecepcionistDto);
  }

  @Get()
  findAll() {
    return this.recepcionistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recepcionistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecepcionistDto: UpdateRecepcionistDto) {
    return this.recepcionistService.update(+id, updateRecepcionistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recepcionistService.remove(+id);
  }
}
