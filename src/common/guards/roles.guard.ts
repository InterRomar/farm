import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import UserRole from 'src/modules/user/enums/UserRole';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Admin should have access to any route

    console.log(user.role === UserRole.admin);
    console.log(user.role);
    return user.role === UserRole.admin || requiredRole === user.role;
  }
}
