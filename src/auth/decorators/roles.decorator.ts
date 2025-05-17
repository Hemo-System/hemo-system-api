import { SetMetadata } from '@nestjs/common';
import { ProfessionalRole } from 'src/users/types/professional_role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ProfessionalRole[]) =>
  SetMetadata(ROLES_KEY, roles);
