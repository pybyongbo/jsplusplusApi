const courseModel = require("../lib/mysql.js");


// 查询分类:
exports.getFieldCourse = async ctx => {
  await courseModel
    .get_field_course()
    .then(result => {
      ctx.body = {
        code: 0,
        message: "成功",
        fieldCourse: result
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
  let {field=-1} = ctx.query;
  // sleep.sleep(1);
  await courseModel
    .get_field_course_list(field)
    .then(result => {
      ctx.body = {
        code: 0,
        message: "成功",
        courseList: result
      };
    })
    .catch(() => {
      ctx.body = {
        code: 1,
        message: "失败"
      };
    });
}
