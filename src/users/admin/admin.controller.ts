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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProfessionalRole } from '@prisma/client';
import { Admin } from './entities/admin.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Admin })
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Roles(ProfessionalRole.admin)
  @ApiOkResponse({ type: [Admin] })
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Patch(':id')
  @Roles(ProfessionalRole.admin)
  @ApiCreatedResponse({ type: Admin })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @Roles(ProfessionalRole.admin)
  @ApiResponse({ status: 204, description: 'Admin successfully deleted.' })
  remove(@Param('id') id: string): Promise<Admin> {
    return this.adminService.remove(+id);
  }
}
