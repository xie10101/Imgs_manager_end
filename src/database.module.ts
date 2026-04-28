import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '6582352',
      database: 'polispost',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true,
      //同步表处理直接修改了原先定义的数据库表结构 默认false -- 最初设计可以通过此方式进行同步  结构确定后关闭
    }),
  ],
})
export class dataBaseModule {}
