import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminController } from './admin/admin.controller';
import { HealthProfessionalController } from './health_professional/health_professional.controller';
import { RecepcionistController } from './recepcionist/recepcionist.controller';
import { RecepcionistService } from './recepcionist/recepcionist.service';
import { HealthProfessionalService } from './health_professional/health_professional.service';
import { AdminService } from './admin/admin.service';
import { EmailValidationService } from './utils/services/email_validation.service';

@Module({
    imports: [PrismaModule],
    controllers: [AdminController, HealthProfessionalController, RecepcionistController],
    providers: [AdminService, HealthProfessionalService, RecepcionistService, EmailValidationService],
    exports: [AdminService, HealthProfessionalService, RecepcionistService, EmailValidationService],
})
export class UsersModule { }
