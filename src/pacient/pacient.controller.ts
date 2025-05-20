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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pacient } from './entities/pacient.entity';
import { ProfessionalRole } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('pacients')
@Controller('pacients')
export class PacientController {
  constructor(private readonly pacientService: PacientService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Pacient, description: 'Pacient successfully created.' })
  create(@Request() req, @Body() createPacientDto: CreatePacientDto) {
    return this.pacientService.create(createPacientDto, req.user.role, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: [Pacient], description: 'List of all pacients.' })
  findAll() {
    return this.pacientService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: Pacient, description: 'Details of a specific pacient.' })
  findOne(@Param('id') id: string) {
    return this.pacientService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Pacient, description: 'Pacient successfully updated.' })
  update(
    @Param('id') id: string,
    @Body() updatePacientDto: UpdatePacientDto,
  ) {
    return this.pacientService.update(+id, updatePacientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({
    status: 204,
    description: 'Pacient successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.pacientService.remove(+id);
  }
}