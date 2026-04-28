import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

//  状态枚举值
export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity('posts')
// 实体定义
export class Post {
  // 自增 // 默认不为空 null
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  title: string;
  // 允许为空 null
  @Column({ length: 255, nullable: true })
  summary: string;
  // 长文本-类型定义
  @Column('longtext')
  // @Column({type: 'longtext',}) 简化写法
  content: string;
  // 允许为空 null
  @Column({ length: 255, nullable: true })
  cover: string;
  // 枚举类型 -- 不能为空（表单提交注意不能为空）
  @Column({
    name: 'category_id',
  })
  categoryId: number;
  // 枚举类型 -- 默认值
  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT, // 默认值 保证了 not null
  })
  status: PostStatus;

  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

// 字段命名存在错误
