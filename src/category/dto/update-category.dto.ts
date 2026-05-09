import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

// 继承 CreatePostDto
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // 补充 id 段
  @IsInt()
  @IsNotEmpty({ message: '分类ID不能为空' })
  id: number;
}
