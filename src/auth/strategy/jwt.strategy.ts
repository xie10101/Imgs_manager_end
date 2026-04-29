import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // 从 Authorization: Bearer <token> 取
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 过期自动报错
      secretOrKey: '你的JWT密钥', // 建议放环境变量
    });
  }

  // 校验 JWT  payload → 返回用户（挂到 req.user）
  async validate(payload: any) {
    // payload 是 JWT 解码后的内容（如 { sub: userId, email: '...' }）
    return { userId: payload.sub, email: payload.email };
  }
}
