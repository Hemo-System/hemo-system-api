import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecepcionistService } from './recepcionist.service';
import { CreateRecepcionistDto } from './dto/create-recepcionist.dto';
import { UpdateRecepcionistDto } from './dto/update-recepcionist.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Recepcionist } from './entities/recepcionist.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { ProfessionalRole } from '../types/professional_role.enum';

@Controller('recepcionist')
export class RecepcionistController {
  constructor(private readonly recepcionistService: RecepcionistService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Recepcionist })
  create(@Request() req, @Body() createRecepcionistDto: CreateRecepcionistDto) {
    return this.recepcionistService.create(createRecepcionistDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiOkResponse({ type: [Recepcionist] })
  findAll() {
    return this.recepcionistService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin, ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Recepcionist })
  update(
    @Param('id') id: string,
    @Body() updateRecepcionistDto: UpdateRecepcionistDto,
  ) {
    return this.recepcionistService.update(+id, updateRecepcionistDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({
    status: 204,
    description: 'Recepcionist successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.recepcionistService.remove(+id);
  }
}
