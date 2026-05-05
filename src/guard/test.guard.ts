import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // return request.user.id === 1;

    return true;
  }
}

//
