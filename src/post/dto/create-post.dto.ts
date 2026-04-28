import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  IsInt,
} from 'class-validator';
import { PostStatus } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(1, 120, { message: '标题长度应在1-120个字符之间' })
  title: string;

  @IsString()
  @IsOptional()
  @Length(0, 255, { message: '摘要长度不能超过255个字符' })
  summary?: string;

  @IsString()
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  cover?: string;

  @IsInt({ message: '分类ID必须是整数' })
  @IsNotEmpty({ message: '分类ID不能为空' })
  categoryId: number;

  @IsEnum(PostStatus, { message: '状态值非法' })
  @IsOptional()
  status?: PostStatus;
}
