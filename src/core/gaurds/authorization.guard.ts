import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from "../decorator/permission.decorator";
import { ROLE } from "../decorator/role.decorator";


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
 
  ) {}

  async canActivate(context: ExecutionContext) {
    const permissionKey = this.reflector.getAllAndOverride<boolean>(PERMISSIONS, [
      context.getHandler(),
      context.getClass(),
    ]);

    const roleKey = this.reflector.getAllAndOverride<boolean>(ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permissionKey) return true;

    const request = context.switchToHttp().getRequest();
    const userReq = request.user;
    return true;
}
}
