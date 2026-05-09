import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

// 设置状态枚举
export enum CategoryStatus {
  Enabled = 1,
  Disabled = 0,
}

@Entity('blog_category') // 数据库表名
export class Category {
  // 主键自增 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 分类名称（唯一，不能为空）
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '分类名称',
  })
  name: string;

  // 分类描述
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '分类描述',
  })
  description: string;

  // 排序号 -- 用于自定义分类显示顺序-- 排除创建时间 ，id的影响
  @Column({
    type: 'int',
    default: 1,
    comment: '排序号，越小越靠前',
  })
  sort: number = 1;

  // 状态 1=启用 0=禁用
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态 1启用 0禁用',
  })
  status: CategoryStatus = CategoryStatus.Enabled;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
  /**
 * 创建「分类」的时候，根本不用管 posts: Post[] 这个字段
这个字段不用存、不用传、不用赋值，只是给查询关联用的。

 */

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updateTime: Date;
}
