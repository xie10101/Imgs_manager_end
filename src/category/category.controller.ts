import { Controller, Get, Body, Param, Delete, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 获取所有分类
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  // 新增分类
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  // 根据ID查询
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(+id);
  }

  // 删除分类
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }
}
