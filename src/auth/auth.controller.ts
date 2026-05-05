import { Body, Post, Controller, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
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
  @UseGuards(LocalAuthGuard) //直接做策略处理 -- 策略处理优势 ？
  login(@Req() req: any) {
    // 此处重新设置
    return this.authService.login(req.user);
  }

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  info(@Req() req: any) {
    console.log(req);
  }
}
