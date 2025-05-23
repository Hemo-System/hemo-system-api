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
import { NurseService } from './nurse.service';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProfessionalRole } from '@prisma/client';
import { Nurse } from './entities/nurse.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Nurse })
  create(@Request() req, @Body() createNurseDto: CreateNurseDto) {
    return this.nurseService.create(createNurseDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiOkResponse({ type: [Nurse] })
  findAll() {
    return this.nurseService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin, ProfessionalRole.nurse)
  @ApiCreatedResponse({ type: Nurse })
  update(@Param('id') id: string, @Body() updateNurseDto: UpdateNurseDto) {
    return this.nurseService.update(+id, updateNurseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({ status: 204, description: 'Nurse successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.nurseService.remove(+id);
  }
}
