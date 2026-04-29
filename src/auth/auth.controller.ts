import { Body, Post, Controller, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //  get 方法为啥会
  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    const { username, password, email } = user;
    return await this.authService.register(username, password, email);
  }

  //根据数据库统一设置接口文档- 参数字段保证
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { username, password } = body;
    return await this.authService.validateUser(username, password);
  }

  @Get('/info')
  info(@Req() req: any) {
    console.log(req);
  }
}
