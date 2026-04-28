import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string) {
    /**
     * 具体的逻辑操作 ：
     * 1. 根据用户名查询用户信息
     * 2. 验证密码
     * 3. 返回用户信息 + jwt
     */
    const user = await this.userService.findOneByUserName(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
      //验证失败需要返回错误提示
    }
    return null;
  }

  /**
   * 注册逻辑
   */
  async register(username: string, password: string) {
    // 1.判断username是否重复 ;
    // 2.保存用户信息 -- 处理密码 、create 用户元组
    const user = await this.userService.findOneByUserName(username);
    if (user) {
      return null;
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // 参数不足
    return this.userService.createUser({
      username,
      password: hash,
    });
  }
}

/**
 * 主要处理逻辑
 */
