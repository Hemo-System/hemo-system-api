
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/users/admin/admin.service';
import { HealthProfessionalService } from 'src/users/health_professional/health_professional.service';
import { NurseService } from 'src/users/nurse/nurse.service';
import { RecepcionistService } from 'src/users/recepcionist/recepcionist.service';
import { User } from './types/user.type';


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


    // async getDetails(role: ProfessionalRole, id: number): Promise<User> {

    // TODO: Pensar aqui como implementar o retorno do usuário logado
    //  1. Verificar a role do usuário e busca o ID correspondente baseado na role
    //  2. Ao cadastrar um usuário, utilizar um prefixo de ID para que nunca tenhamos IDs iguais em tabelas diferentes

    //     const user = await this.usersService.findById(id);

    //     if (!user) {
    //         throw new NotFoundException();
    //     }

    //     return user;
    // }
}
