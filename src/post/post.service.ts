import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PostService {
  // 数据 业务 交互层
  // 依赖注入实体对象
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return this.repo.query(`SELECT * FROM post`);
  }

  findOne(id: number) {
    return this.repo.query(`SELECT * FROM post WHERE id = ${id}`);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  // 多个生命周期钩子的执行
  onModuleInit() {
    console.log('onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('应用已启动，可以处理请求');
  }
}
