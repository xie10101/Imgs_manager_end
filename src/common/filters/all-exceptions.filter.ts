import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ExceptionResponse } from '../../errors/exception.type';
import { ConnectionPoolClosedEvent } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 默认设置
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let code = 500;

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const responseBody = exception.getResponse();
      status = statusCode;
      code = status;
      // 基础自定义异常的参数对象类型存在局限
      // 类型兼容逻辑
      if (typeof responseBody === 'object' && responseBody !== null) {
        message = (responseBody as any).message || message;
      }
      if ((responseBody as ExceptionResponse).msg) {
        message = (responseBody as ExceptionResponse).msg || message;
        // 2. 优先取自定义的业务 code，其码
        code = (responseBody as ExceptionResponse).code || status;
      }
    }
    // 使用 Logger 记录错误日志
    // const logInfo = {
    //   path: request.url,
    //   method: request.method,
    //   status,
    //   code,
    //   message,
    // };

    if (status >= 500) {
      // 500 错误记录详细堆栈
      this.logger.error(
        `[${request.method}] ${request.url} - ${status}`,
        exception instanceof Error
          ? exception.stack
          : JSON.stringify(exception),
      );
    } else {
      // 业务错误记录警告级别
      this.logger.warn(
        `[${request.method}] ${request.url} - ${status} [${code}]: ${message}`,
      );
    }

    const newResponse = {
      code,
      data: null,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(newResponse);
  }
}
