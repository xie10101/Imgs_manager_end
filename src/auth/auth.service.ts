import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // 登录验证逻辑
  async validateUser(username: string, password: string) {
    /**
     * 具体的逻辑操作 ：
     * 1. 根据用户名查询用户信息
     * 2. 验证密码
     * 3. 返回用户信息 -- token：xx
     */
    const user = await this.userService.findOneByUserName(username);
    if (!user) {
      this.logger.warn('登录失败：用户名不存在');
      throw new UnauthorizedException('用户名或密码错误');
    }

    //实际操作:提取其中hash的盐并和当前password生成hash
    const isMatch = await bcrypt.compare(password, user.password); //此步处理的问题
    if (!isMatch) {
      this.logger.warn('登录失败：密码错误');
      throw new UnauthorizedException('用户名或密码错误');
    }

    this.logger.log(`用户【${username}】登录成功`);
    const { password: _, ...userInfo } = user; // password 标识符重复替换命名
    return userInfo;
  }

  //登录主逻辑
  login(user) {
    // 生成 JWT payload
    const payload = { username: user.username, sub: user.id };
    // 使用 JWT 生成 access_token
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user,
    };
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
