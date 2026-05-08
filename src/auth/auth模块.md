## 接口设置 
     


## 两个问题：

1. 在接口处理时POST 请求一般都会 设置 DTO类 用于校验 ？ 是否有快捷创建方式 ，
    一般POST 请求都会设置 DTO类; 暂时没有快捷创建;
     使用 PartialType , PickType , OmitType 如果你已经有一个完整的 CreateUserDto ，不需要为 UpdateUserDto 重写一遍;
     优点 ： Swagger 插件自动映射 如果你使用了 @nestjs/swagger 插件，它会自动识别 DTO。虽然不能“少写代码”，但它可以减少你维护文档的工作量。

2. 一般 个人信息返回接口常常设置缓存处理 ？
    不建议进行长时间缓存；  --- 个人信息回进行前端的全局状态管理-非刷新不重新获取 
    - Redis 短暂缓存 ：将用户信息缓存到 Redis 中，设置较短的过期时间（如 5-10 分钟）。
    - 缓存失效策略 ：在 UserService.update 或 UserService.delete 被调用时， 主动删除 该用户的 Redis 缓存。
--- 

注意敏感字段过滤 ：

敏感字段过滤 ：在返回用户信息时，务必通过 class-transformer 的 @Exclude() 或者在查询时使用 select: false 来隐藏 password 字段，确保安全。
