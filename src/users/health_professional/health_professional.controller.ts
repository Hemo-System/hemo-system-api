import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HealthProfessionalService } from './health_professional.service';
import { CreateHealthProfessionalDto } from './dto/create_health_professional.dto';
import { UpdateHealthProfessionalDto } from './dto/update_health_professional.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProfessionalRole } from '@prisma/client';
import { HealthProfessional } from './entities/health_professional.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('health-professional')
export class HealthProfessionalController {
  constructor(
    private readonly healthProfessionalService: HealthProfessionalService,
  ) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: HealthProfessional })
  create(@Body() createHealthProfessionalDto: CreateHealthProfessionalDto) {
    return this.healthProfessionalService.create(createHealthProfessionalDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiOkResponse({ type: [HealthProfessional] })
  findAll() {
    return this.healthProfessionalService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin, ProfessionalRole.healthProfessional)
  @ApiCreatedResponse({ type: HealthProfessional })
  update(
    @Param('id') id: string,
    @Body() updateHealthProfessionalDto: UpdateHealthProfessionalDto,
  ) {
    return this.healthProfessionalService.update(
      +id,
      updateHealthProfessionalDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({
    status: 204,
    description: 'HealthProfessional successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.healthProfessionalService.remove(+id);
  }
}
