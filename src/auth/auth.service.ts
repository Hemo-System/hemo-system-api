
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/users/admin/admin.service';
import { HealthProfessionalService } from 'src/users/health_professional/health_professional.service';
import { NurseService } from 'src/users/nurse/nurse.service';
import { RecepcionistService } from 'src/users/recepcionist/recepcionist.service';
import { User } from './types/user.type';
import { ProfessionalRole } from '@prisma/client';


@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private recepcionistService: RecepcionistService,
        private healthProfessionalService: HealthProfessionalService,
        private nurseService: NurseService,
        private jwtService: JwtService
    ) { }


    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user: User =
            (await this.adminService.findByEmail(email)) ||
            (await this.recepcionistService.findByEmail(email)) ||
            (await this.healthProfessionalService.findByEmail(email)) ||
            (await this.nurseService.findByEmail(email));

        // Verificar se o usuário foi encontrado
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Validar a senha
        const validPassword = user && await this.validatePassword(password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException('Invalid password');
        }

        // Criar o payload do token JWT
        const payload = { id: user?.id, email: user?.email, role: user?.role };

        // Retornar o token de acesso
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async validatePassword(password: string, userPassword: string) {
        // return bcrypt.compare(password, userPassword)
        return password === userPassword;
    }


    async getDetails(role: ProfessionalRole, id: number): Promise<User> {
        let user: User | null = null;

        switch (role) {
            case 'admin':
                user = await this.adminService.findOne(id);
                break;
            case 'recepcionist':
                user = await this.recepcionistService.findOne(id);
                break;
            case 'healthProfessional':
                user = await this.healthProfessionalService.findOne(id);
                break;
            case 'nurse':
                user = await this.nurseService.findOne(id);
                break;
            default:
                throw new UnauthorizedException('Invalid role');
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
