import { SetMetadata } from '@nestjs/common';
import UserRole from 'src/modules/user/enums/UserRole';

export const Role = (role: UserRole) => SetMetadata('role', role);
