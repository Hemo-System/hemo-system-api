import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientModule } from './pacient/pacient.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConsultationHistoryModule } from './consultation_history/consultation_history.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthProfessionalScaleModule } from './health_professional_scale/health_professional_scale.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    HealthProfessionalScaleModule,
    PacientModule,
    ScheduleModule,
    ConsultationHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard, },
  ],
})
export class AppModule { }
