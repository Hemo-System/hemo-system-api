
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { HealthProfessional } from 'src/users/health_professional/entities/health_professional.entity';
import { Admin } from 'src/users/admin/entities/admin.entity';
import { Recepcionist } from 'src/users/recepcionist/entities/recepcionist.entity';
import { Nurse } from 'src/users/nurse/entities/nurse.entity';
import { User } from './types/user.type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiOkResponse({
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' }
            }
        }
    })
    async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
        return await this.authService.login(body.email, body.password);
    }

    // @Get("detail")
    // @UseGuards(AuthGuard)
    // @ApiOkResponse({
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             id: { type: 'string' },
    //             name: { type: 'string' },
    //             email: { type: 'string' },
    //             role: { type: 'string' }
    //         }
    //     }
    // }) async getDetails(@Request() req): Promise<User> {
    //     return await this.authService.getDetails(req.user.role, req.user.id);
    // }
}
