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
import { HealthProfessionalScaleService } from './health_professional_scale.service';
import { CreateHealthProfessionalScaleDto } from './dto/create-health_professional_scale.dto';
import { UpdateHealthProfessionalScaleDto } from './dto/update-health_professional_scale.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProfessionalRole } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { HealthProfessionalScale } from './entities/health_professional_scale.entity';

@Controller('health-professional-scale')
export class HealthProfessionalScaleController {
  constructor(
    private readonly healthProfessionalScaleService: HealthProfessionalScaleService,
  ) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: HealthProfessionalScale })
  create(
    @Request() req,
    @Body() createHealthProfessionalScaleDto: CreateHealthProfessionalScaleDto,
  ) {
    return this.healthProfessionalScaleService.create(
      createHealthProfessionalScaleDto,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: [HealthProfessionalScale] })
  findAll() {
    return this.healthProfessionalScaleService.findAll();
  }

  @Get('by-health-professional/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: [HealthProfessionalScale] })
  findByHealthProfessional(@Param('id') id: string) {
    return this.healthProfessionalScaleService.findByHealthProfessional(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: HealthProfessionalScale })
  update(
    @Param('id') id: string,
    @Body() updateHealthProfessionalScaleDto: UpdateHealthProfessionalScaleDto,
  ) {
    return this.healthProfessionalScaleService.update(
      +id,
      updateHealthProfessionalScaleDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({
    status: 204,
    description: 'HealthProfessionalScale successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.healthProfessionalScaleService.remove(+id);
  }
}