import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/users/admin/admin.module';
import { RecepcionistModule } from 'src/users/recepcionist/recepcionist.module';
import { HealthProfessionalModule } from 'src/users/health_professional/health_professional.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => RecepcionistModule),
    forwardRef(() => HealthProfessionalModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
