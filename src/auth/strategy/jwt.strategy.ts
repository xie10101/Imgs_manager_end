import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'customJwt') {
  constructor(private readonly userService: UserService) {
    super({
      // 从 Authorization: Bearer <token> 取
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 过期自动报错
      secretOrKey: jwtConstants.secret, // 建议放环境变量
    });
  }

  // 校验 JWT  payload → 返回用户（挂到 req.user）
  async validate(payload: any) {
    // payload 是 JWT 解码后的内容（如 { sub: userId, email: '...' }）
    const { sub: id } = payload;
    // 1. 查找用户
    const user = await this.userService.findOne(id);
    console.log(user);
    // 2. 校验用户是否存在
    if (!user) {
      throw new UnauthorizedException('用户不存在或已过期');
    }

    // 3. 校验用户状态（如是否被禁用）
    if (user.status === 0) {
      throw new UnauthorizedException('账号已被禁用，请联系管理员');
    }

    // 4. 返回对象会被挂载到 req.user
    const { password, ...result } = user;
    return result;
  }
}
