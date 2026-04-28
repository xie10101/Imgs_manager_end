import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 通过类型设置依赖注入
  constructor(private readonly appService: AppService) {}
}
