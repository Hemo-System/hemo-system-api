import { Admin } from 'src/users/admin/entities/admin.entity';
import { HealthProfessional } from 'src/users/health_professional/entities/health_professional.entity';
import { Recepcionist } from 'src/users/recepcionist/entities/recepcionist.entity';

export type User = Admin | Recepcionist | HealthProfessional;
