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
      //实际操作:提取其中hash的盐并和当前password生成hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // 返回数据是应该包含用户信息（排除敏感信息） + jwt
        /**
         *
         */
        return user;
      }
    }
    // 验证失败需要返回错误提示 - 用户名或密码错误
    return null;
  }

  /**
   * 注册逻辑
   */
  async register(username: string, password: string, email: string) {
    // 1.判断username是否重复 ;
    // 2.保存用户信息 -- 处理密码 、create 用户元组
    const user = await this.userService.findOneByUserName(username);
    const emailUser = await this.userService.indOneByEmail(email);
    if (user || emailUser) {
      // 返回错误提示 - 该用户或邮箱已经存在
      return null;
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // 返回promise对象 -- 进行 try catch 处理
    try {
      const user = await this.userService.createUser({
        username,
        password: hash,
        email,
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
