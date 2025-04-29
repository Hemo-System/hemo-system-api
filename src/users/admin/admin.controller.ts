import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ProfessionalRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Admin } from './entities/admin.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Admin })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiOkResponse({ type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Admin })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ProfessionalRole.admin)
  @ApiResponse({ status: 204, description: 'Admin successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
