import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   return true;
  // }
}
