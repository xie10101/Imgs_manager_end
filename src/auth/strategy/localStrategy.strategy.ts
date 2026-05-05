import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

// 自定义本地策略

@Injectable()
export class localStrategyService extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    // 解释含义
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }
  // 校验回调：email + password → 返回用户（挂到 req.user）
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // 抛出 401 错误，Nest 会自动将其转换为规范的 JSON 响应
      throw new UnauthorizedException('账号或密码错误');
    }
    return user; // 挂载到 req.user
  }
}
