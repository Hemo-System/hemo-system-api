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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Schedule } from './entities/schedule.entity';
import { ProfessionalRole } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Schedule, description: 'Schedule successfully created.' })
  create(@Request() req, @Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto, req.user.role, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: [Schedule], description: 'List of all schedules.' })
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiOkResponse({ type: Schedule, description: 'Details of a specific schedule.' })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.recepcionist)
  @ApiCreatedResponse({ type: Schedule, description: 'Schedule successfully updated.' })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto,) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({ status: 204, description: 'Schedule successfully deleted.', })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
