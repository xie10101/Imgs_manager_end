import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from './exception.type';

// 自定义业务异常
export class BusinessException extends HttpException {
  // 业务自定义码 + 提示文案 + HTTP状态码
  constructor(
    public readonly responseData: ExceptionResponse,
    status: number = HttpStatus.BAD_REQUEST,
  ) {
    // 把业务信息塞到 response 里
    super(responseData.msg, status);
    this.responseData = responseData;
  }
  //
}
