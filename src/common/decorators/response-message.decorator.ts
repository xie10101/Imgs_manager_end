// import { SetMetadata } from '@nestjs/common';

// export const RESPONSE_MESSAGE_METADATA = 'response_message';

// /**
//  * 自定义响应消息装饰器
//  * @param message 响应消息内容
//  */
// export const ResponseMessage = (message: string) =>
//   SetMetadata(RESPONSE_MESSAGE_METADATA, message);

//roles.decorator.ts
import { Reflector } from '@nestjs/core';

export const message = Reflector.createDecorator<string>();
