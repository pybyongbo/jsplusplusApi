const courseModel = require("../lib/mysql.js");


const fdata = async (data) => {

  const promises = data.map(async item => {
    const listItem = await courseModel.get_field_course_list(item.fieldType,'').then(res => res.length);
    return listItem;

  });

  const listItems = await Promise.all(promises);
  // console.log('promises', promises);
  // console.log('result listItems', listItems);
  const res = data.map((item, index) => ({
    ...item,
    totalCount: listItems[index]
  }));

  return res;

}


// 查询课程分类:
exports.getFieldCourse = async ctx => {

  await courseModel
    .get_field_course()
    .then(async result => {
      ctx.body = {
        code: 0,
        message: "成功",
        result: await fdata(result)
        // result:result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: "失败"
      };
    });
}


// 查询分类对应的列表数据:

exports.getFieldCourseList = async ctx => {
  let { field = -1,keywords="" } = ctx.query;
  console.log('keywords',keywords);
  await courseModel
    .get_field_course_list(field,keywords)
    .then(result => {
      ctx.body = {
        code: 0,
        message: "成功",
        result: result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: "失败"
      };
    });
}

//新增课程分类信息  courseCateCreate
exports.courseCateCreate = async ctx => {
    let { fieldName, fieldType } = ctx.request.body;
    await courseModel.add_course_cate([fieldName, fieldType]).then(() => {
        ctx.body = {
          code: 0,
          message: "课程分类新增成功"
        };
      })
      .catch(() => {
        ctx.body = {
          code: 500,
          message: "新增失败"
        };
      });
    }


// 新增课程信息
exports.courseCreate = async ctx => {
  let { title, fieldType, thumb,price,studying } = ctx.request.body;
  await courseModel.add_course_info([title, fieldType, thumb,price,studying]).then(() => {
      ctx.body = {
        code: 0,
        message: "课程信息新增成功"
      };
    })
    .catch(() => {
      ctx.body = {
        code: 500,
        message: "新增失败"
      };
    });
  }