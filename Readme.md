### 项目介绍:

此项目是用 koa2 简单搭建的一个服务端 Api 项目.主要用于学习 B 站`小野森森`老师的前端教程.

项目提供给两个接口供前端测试使用:

- 课程分类接口(/course/get_course_fields)
- 课程分类列表接口(/course/get_courses/all)

### 全局安装 Koa

执行命令:

```js
 npm install koa-generator -g
```

```js
  koa2 jsplusplusApi
```

```js
  npm install
  npm run start
```

### JS(map)循环中,使用异步:

![](https://images.901web.com/2021-11-10-071008.png)

如上图所示,我想在接口中统计每个分类下面课程总数,然后返回一个`totalCount`字段合并上去.

首先,我需要循环`/course/get_course_fields`这个接口返回的数据,然后拿到每项的`fieldType`字段,然后循环异步调用`/course/get_field_course_list`这个接口,统计每个课程分类对应的条数.

**controller 文件夹中对应的方法如下:**

#### 循环调用异步,增加*totalCount*字段

```javascript
const fdata = async (data) => {
  const promises = data.map(async (item) => {
    const listItem = await courseModel
      .get_field_course_list(item.fieldType)
      .then((res) => res.length);
    return listItem;
  });

  const listItems = await Promise.all(promises);
  // console.log('promises', promises)
  console.log('result listItems', listItems);
  const res = data.map((item, index) => ({
    ...item,
    totalCount: listItems[index],
  }));

  return res;
};
```

#### 获取课程分类导航数据

```javascript
// 查询分类:
exports.getFieldCourse = async (ctx) => {
  await courseModel
    .get_field_course()
    .then(async (result) => {
      ctx.body = {
        code: 0,
        message: '成功',
        result: await fdata(result),
        // result:result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: '失败',
      };
    });
};
```

### 接口预览与测试:

##### 课程分类导航

```txt
API地址:`http://localhost:3001/course/get_course_fields`;
打开浏览器,输入`http://localhost:3001/course/get_course_fields`即可看到接口返回的课程所有分类数据;
```

##### 课程分类数据列表:

```txt
API地址:`http://localhost:3001/course/get_courses/all`;
打开浏览器,输入`http://localhost:3001/course/get_courses/all`即可看到接口返回课程分类列表的数据;
```

##### 课程对应分类列表数据:

```txt
API地址:`http://localhost:3001/course/get_courses/all?field=${field}`
打开浏览器,输入`http://localhost:3001/course/get_courses/all?field=1`即可看到接口返回课程分类列表的数据;
```

### 项目中对应数据表的 sql 语句:

```mysql

CREATE TABLE `course_field` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `fieldName` varchar(20) DEFAULT NULL,
  `fieldType` smallint(5) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `course_field` VALUES (1, '前端高薪就业', 1);
INSERT INTO `course_field` VALUES (2, '精品公益课', 2);
INSERT INTO `course_field` VALUES (3, '精品小课', 3);
INSERT INTO `course_field` VALUES (4, '全休班体验课', 4);

```

```mysql

CREATE TABLE `course_field_list` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `fieldType` smallint(5) DEFAULT '0',
  `thumb` varchar(200) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `studying` smallint(5) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


INSERT INTO `course_field_list` VALUES (1, 'WEB前端开发高级工程师『快速就业助力计划』【JS++前端】', 1, 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', 3388.00, 0);
INSERT INTO `course_field_list` VALUES (2, 'WEB前端高级工程师养成计划『全修精英特训』【JS++】', 1, 'http://tximg.jsplusplus.com/Qcy-cP_NfnuQSWZ3fEAOh.jpg', 9988.00, 86);
INSERT INTO `course_field_list` VALUES (3, ' WEB前端高级工程师养成计划『提升计划-第3期』【JS++】', 1, 'http://tximg.jsplusplus.com/lrYzQvKZLcXMmiBZ6Cheh.jpg', 7580.00, 13);
INSERT INTO `course_field_list` VALUES (4, 'WEB前端高级工程师养成计划『就业计划-第4期』【JS++】', 1, 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', 6180.00, 60);
INSERT INTO `course_field_list` VALUES (5, '不止于就业前端技术|JavaScript底层核心|组件化开发|JS|Vue|Node', 2, 'http://tximg.jsplusplus.com/hKA-X-jcjSugmjPOYfUdw.jpg', 0.00, 941);
INSERT INTO `course_field_list` VALUES (6, '【2020全新JS++前端】『JavaScript业务能力提升班』', 2, 'http://tximg.jsplusplus.com/QB2ZwTAfmxkOF2gmeK19p.jpg', 0.00, 82);
INSERT INTO `course_field_list` VALUES (7, 'WEB大前端开发架构师养成计划『全栈架构特训』【JS++】', 2, 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', 10688.00, 3);
INSERT INTO `course_field_list` VALUES (8, 'JS++小野老师带你玩转『前端JavaScript模块化』', 3, 'http://tximg.jsplusplus.com/TSAE9FUv7Up7a4bFwSNBY.jpg', 119.00, 71);
INSERT INTO `course_field_list` VALUES (9, 'Vue『前端课堂』WEB APP - Vue-router|Vuex【10元拿好课】', 3, 'http://tximg.jsplusplus.com/w4zEz7jlJ3HQEP7xlZTYv.jpg', 299.00, 41);
INSERT INTO `course_field_list` VALUES (10, '10小时搞定移动端『新闻头条』【纯正阿里系组件化开发】', 3, 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', 169.00, 8713);
INSERT INTO `course_field_list` VALUES (11, 'VueJS项目架构与组件化设计|组件抽象|全实战项目|【一线生活通】', 3, 'http://tximg.jsplusplus.com/ALrQaIA3wquB-YKg8KOQN.jpg', 498.00, 6);
INSERT INTO `course_field_list` VALUES (12, '小野老师-JS组件化『小米手机官网升级版』', 3, 'http://tximg.jsplusplus.com/ALrQaIA3wquB-YKg8KOQN.jpg', 498.00, 6);
INSERT INTO `course_field_list` VALUES (13, 'WEB前端开发系列项目实战『直播教室』【JS++前端】', 4, 'http://tximg.jsplusplus.com/BocDkboW0LsQDXSOGNVQQ.jpg', 0.00, 35);
INSERT INTO `course_field_list` VALUES (14, '高级前端Vip就业班试学课【JS++】', 4, 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', 299.00, 54);

```

### 链接查询统计各个课程分类课程的总数:

```mysql

SELECT count(*),a.fieldName,b.fieldType FROM course_field AS a INNER JOIN course_field_list AS b ON a.fieldType = b.fieldType GROUP BY a.fieldType;

```

### 更新日志 (2022-04-13)

1.改写列表接口,支持搜索查询功能. 2.添加新增课程功能(以及课程分类) 3.课程列表样式切换

### 待优化更新任务列表

1. 更改课程分类 CODE 字段 (不能重复,已经存在对应的课程 code 前端给出提示信息)
2. 删除课程分类数据时候,如果课程分类下面有对应的课程信息,不能直接删除.(或者是删除对应的课程列表数据)
