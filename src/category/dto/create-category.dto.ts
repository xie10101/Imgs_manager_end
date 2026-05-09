import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  IsInt,
} from 'class-validator';
import { CategoryStatus } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: '分类名称不能为空' })
  @Length(1, 20, { message: '分类名称长度应在1-20个字符之间' })
  name: string;

  // 分类描述
  @IsString()
  @IsOptional()
  @Length(0, 255, { message: '分类描述长度不能超过255个字符' })
  description?: string;

  // 排序号 -- 用于自定义分类显示顺序-- 排除创建时间 ，id的影响
  @IsInt()
  @IsOptional()
  sort: number = 1;

  @IsEnum(CategoryStatus)
  @IsOptional()
  status: CategoryStatus = CategoryStatus.Enabled;
}
