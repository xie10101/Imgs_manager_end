// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private rep: Repository<Category>,
  ) {}

  // 查询所有分类
  async findAll() {
    return this.rep.find({
      order: { sort: 'ASC' },
    });
  }

  // 新增分类
  create(dto: CreateCategoryDto) {
    const category = this.rep.create(dto);
    return this.rep.save(category);
  }

  // 根据ID查询
  async findById(id: number) {
    return this.rep.findOneBy({ id });
  }

  // 删除分类
  async delete(id: number) {
    return this.rep.delete(id);
  }
}
