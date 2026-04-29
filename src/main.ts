import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 请求方法类型限制 , 域名白名单 , 允许携带 Cookie
  app.enableCors({
    // 域名白名单：可以是一个字符串、正则，或者包含多个来源的数组
    origin: [
      // 包含的是跨域URL- 请求从何来
      'http://localhost:3000',
      'http://localhost:8080',
      'http://your-production-domain.com', // 替换为你的生产域名
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // 允许携带 Cookie
  });
  // cookie中配置token是较好实践

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤 DTO 未定义的字段
      forbidNonWhitelisted: true, // 传多余字段直接报错
      transform: true, // 自动把普通对象转为 DTO 类实例
    }),
  );

  await app.listen(3000); //监听服务器的端口号-运作其中
}
bootstrap();
