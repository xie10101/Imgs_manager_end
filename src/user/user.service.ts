import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  //查询所有用户
  findAll() {
    return this.repo.find();
  }
  // 根据用户名查询用户信息
  findOneByUserName(username: string) {
    return this.repo.findOneBy({ username });
  }

  // 根据 ID 查询
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  // 根据邮箱查询用户信息
  indOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
  // 创建用户
  async createUser(user: CreateUserDto) {
    const userObj = this.repo.create(user);
    return await this.repo.save(userObj);
  }

  async onModuleInit() {}
}
