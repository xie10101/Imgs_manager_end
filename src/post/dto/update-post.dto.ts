import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsInt, Min } from 'class-validator';

// 继承 CreatePostDto
export class UpdatePostDto extends PartialType(CreatePostDto) {
  /**
   * 如果你希望在更新时也能手动修改阅读量，可以取消下方注释。
   * 通常 viewCount 是由后台逻辑自增的，但在某些管理后台场景下可能需要手动修改。
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  viewCount?: number;
}
