数据库表设计
entity 创建
接口设计
实现接口-逻辑处理
测试
优化

---

POST模块接口 ：
/post 创建 POST
/post 获取 POST列表 GET
/post/:id 获取 POST详情
/post/:id 更新 PATCH
/post/:id 删除 DELETE

//更多的实践 - 包括环境变量的处理
//对于业务请求全流程的具体配置





### 进阶建议：使用 Swagger 自动生成文档
在 NestJS 中，你可以直接在代码中使用装饰器，让系统自动生成交互式的网页文档（Swagger）。

1. 安装依赖 :
   
   ```
   npm install --save @nestjs/swagger swagger-ui-express
   ```
2. 在 main.ts 中配置 :
   
   ```
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
   
   const config = new DocumentBuilder()
     .setTitle('Imgs Manager API')
     .setDescription('博客管理系统接口文档')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api-docs', app, document); // 访问路径为 /api-docs
   ```
3. 在 DTO 中使用装饰器 :
   
   ```
   // src/post/dto/create-post.dto.ts
   import { ApiProperty } from '@nestjs/swagger';
   
   export class CreatePostDto {
     @ApiProperty({ description: '文章标题', example: '我的第一篇博客' })
     title: string;
     
     @ApiProperty({ description: '内容', example: '这是内容...' })
     content: string;
     // ... 其他字段
   }
   ```
配置完成后，启动项目访问 http://localhost:3000/api-docs 即可看到精美的在线接口文档