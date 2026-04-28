import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  findOneByUserName(username: string) {
    return this.repo.findOneBy({ username });
  }
  createUser(user: Partial<User>) {
    // 类型补充 :
    const userObj = this.repo.create(user);
    return this.repo.save(userObj);
  }

  async onModuleInit() {
    await this.createUser({
      username: 'admin',
      password: '123456',
      nickname: 'admin',
      email: 'xxx@qq.com',
      phone: '12345678910',
      role: UserRole.ADMIN,
      status: 1,
    });
  }
}
