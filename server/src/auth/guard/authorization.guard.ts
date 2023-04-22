import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from 'src/schema/user.schema';
import { ForbiddenException } from '@nestjs/common';
import { MessageError } from 'src/helper/messageError.enum';
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      console.log('role guard', user);
      if (!user?.roles.includes(role)) {
        throw new ForbiddenException(MessageError.ErrorRole + role);
      }
      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
