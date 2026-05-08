findOneBy 是 TypeORM Repository 中最常用的简单条件查询方法,根据特定字段查找单条数据的操作。

以下是关于它的详细介绍：

1. const user = await this.userRepository.findOneBy({ id: 1, status: 'active' }); 
2. 核心特性
返回结果：返回匹配到的第一条记录。如果找不到，则返回 null。
参数限制：它只接受一个简单的对象作为参数（键值对）。
查询逻辑：参数中的多个字段默认是 AND 关系。


3. 与 findOne 的区别
这是开发者最容易混淆的地方：

特性    findOneBy                   findOne
参数复杂度 仅支持简单对象（键值对）    支持复杂选项（where, relations, order 等）
写法 findOneBy({ id: 1 })           findOne({ where: { id: 1 } })
关联查询 不支持（不能加载 relations） 支持（可以使用 relations: ['posts']）
排序/跳过 不支持                     支持
建议用法：

如果你只是简单的想通过 id、email、username 等字段找人，用 findOneBy，代码更简洁。
如果你需要关联查询（Join）或者排序，必须使用 findOne。
