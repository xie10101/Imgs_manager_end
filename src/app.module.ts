import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { dataBaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
@Module({
  imports: [PostModule, dataBaseModule, UserModule, AuthModule, CategoryModule],
  controllers: [AppController],
  // 确保依赖可以注入
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
