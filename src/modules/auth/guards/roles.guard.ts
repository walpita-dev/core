import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtRole } from '../models/jwt-payload.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user ? user.roles : []);
  }

  matchRoles = (roles: string[], userRoles: JwtRole[]): boolean => {
    const listOfRoleType = userRoles ? userRoles.map(role => role.role_type) : [];
    for(let i = 0; i<listOfRoleType.length; i += 1) {
      if (roles?.includes(listOfRoleType[i])) {
        return true;
      }
    }
    return false;
  }
}