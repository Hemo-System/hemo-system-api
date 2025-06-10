import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/users/admin/admin.service';
import { HealthProfessionalService } from 'src/users/health_professional/health_professional.service';
import { RecepcionistService } from 'src/users/recepcionist/recepcionist.service';
import { User } from 'src/users/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private recepcionistService: RecepcionistService,
    private healthProfessionalService: HealthProfessionalService,
    private jwtService: JwtService,
  ) { }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: User | null =
      (await this.adminService.findByEmail(email)) ||
      (await this.recepcionistService.findByEmail(email)) ||
      (await this.healthProfessionalService.findByEmail(email))

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword =
      user && (await this.validatePassword(password, user.password));

    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user?.id, email: user?.email, role: user?.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validatePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword)
  }

  async getDetails(role: ProfessionalRole, id: number): Promise<User> {
    let user: User | null = null;

    switch (role) {
      case ProfessionalRole.admin:
        user = await this.adminService.findOne(id);
        break;
      case ProfessionalRole.recepcionist:
        user = await this.recepcionistService.findOne(id);
        break;
      case ProfessionalRole.healthProfessional:
        user = await this.healthProfessionalService.findOne(id);
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
