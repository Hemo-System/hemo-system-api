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
import { PacientService } from './pacient.service';
import { CreatePacientDto } from './dto/create-pacient.dto';
import { UpdatePacientDto } from './dto/update-pacient.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pacient } from './entities/pacient.entity';
import { ProfessionalRole } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('pacients')
export class PacientController {
  constructor(private readonly pacientService: PacientService) { }

  @Post()
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Pacient, description: 'Pacient successfully created.' })
  create(@Request() req, @Body() createPacientDto: CreatePacientDto) {
    return this.pacientService.create(createPacientDto, req.user.role, req.user.id);
  }

  @Get()
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: [Pacient], description: 'List of all pacients.' })
  findAll() {
    return this.pacientService.findAll();
  }

  @Get(':id')
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: Pacient, description: 'Details of a specific pacient.' })
  findOne(@Param('id') id: string) {
    return this.pacientService.findOne(+id);
  }

  @Patch(':id')
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Pacient, description: 'Pacient successfully updated.' })
  update(
    @Param('id') id: string,
    @Body() updatePacientDto: UpdatePacientDto,
  ) {
    return this.pacientService.update(+id, updatePacientDto);
  }

  @Delete(':id')
  @Roles(ProfessionalRole.admin)
  @ApiResponse({
    status: 204,
    description: 'Pacient successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.pacientService.remove(+id);
  }
}