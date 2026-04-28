import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
/**
 *
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('user')
export class User {
  // 自增主键ID
  @PrimaryGeneratedColumn()
  id: number;
  // nullable :true

  // 用户名（唯一、不可重复）
  @Column({ unique: true, length: 50, comment: '用户名' })
  username: string;

  // 邮箱（唯一）
  @Column({ unique: true, length: 100, comment: '邮箱' })
  email: string;

  // 密码（bcrypt加密存储）
  @Column({ length: 100, comment: '密码 bcrypt 加密' })
  password: string;

  // 昵称
  @Column({ length: 50, nullable: true, comment: '昵称' })
  nickname: string;

  // 头像
  @Column({ type: 'text', nullable: true, comment: '头像URL' })
  avatar: string;

  // 手机号
  @Column({ length: 20, nullable: true, comment: '手机号' })
  phone: string;

  // 状态：0-禁用 1-正常
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态 0:禁用 1:正常',
  })
  status: number; // 使用数字表示状态

  // 角色：user / admin
  @Column({
    type: 'enum',
    enum: UserRole,
    default: 'user',
    comment: '用户角色',
  })
  role: UserRole; // 是否可以替换为枚举数据

  // 登录IP
  @Column({ length: 50, nullable: true, comment: '最后登录IP' })
  loginIp: string;

  // 登录时间
  @Column({
    type: 'datetime',
    nullable: true,
    comment: '最后登录时间',
  })
  loginAt: Date;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  // 软删除时间
  @DeleteDateColumn({ comment: '软删除' })
  deletedAt: Date;
}

// 枚举数据
/**
 * // 角色：数据库会生成 ENUM('user', 'admin')
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    comment: '用户角色',
  })
  role: UserRole;
 */

/**
 * 数据库中包含的字段类型 ：
 * 整数类型,浮点小数，字符串类型 ，日期类型，枚举+集合， 二进制 BINARY / VARBINARY ,无原生布尔 ， NULL
 */
