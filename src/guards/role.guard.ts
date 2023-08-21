import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
  constructor(private readonly reflector:Reflector){}

  async canActivate(context: ExecutionContext) {
    
    const requeridRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])
    
    const {user} = context.switchToHttp().getRequest()

    return requeridRoles.some((role:number) => role === user.role)

  }
}
