import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { message } from '../decorators/response-message.decorator';

export interface Response<T> {
  code: number;
  data: T;
  messages: string;
  success: boolean;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  private readonly logger = new Logger(TransformInterceptor.name); // ？ 这是如何使用的 》？

  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const messages =
      this.reflector.get<string>(message, context.getHandler()) || '请求成功';

    return next.handle().pipe(
      map((data) => ({
        code: context.switchToHttp().getResponse().statusCode,
        data,
        messages,
        success: true,
      })),
    );
  }
}
