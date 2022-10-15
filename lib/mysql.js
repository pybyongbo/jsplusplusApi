var mysql = require("mysql");
var config = require("../config/default.js");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};



// 查询所有分类数据
exports.get_field_course = () => {
  let _sql = `select * from course_field;`;
  return query(_sql);
};


// 查询所有课程数量
exports.findCourseListTotalCount = (keywords, field = -1) => {
  let _sql = 'select count(*) as count from course_field_list where 1=1';
  if (field != '-1') { // 全部
    _sql += ` and fieldType = ${field}`
  }
  if (keywords) {
    _sql += ` and title like '%${keywords}%'`
  }
  console.log(_sql);
  return query(_sql);
  // let _sql = '';
  // if (field == -1) {
  //   _sql = `select count(*) as count from course_field_list where title like '%${keywords}%';`
  // } else {
  //   _sql = `select count(*) as count from course_field_list where title like '%${keywords}%' and fieldType=${field} ;`;
  // }
  // return query(_sql);
};


// 查询分类所对应的数据
exports.get_field_course_list = (field, keywords, page = 1, pageSize = 10) => {
  let _sql = 'select * from course_field_list where 1=1';
  console.log('field', field)
  if (field == '-1') { // 全部
    _sql += ' '
  } else {
    _sql += ` and fieldType = ${field}`
  }

  if (keywords) {
    _sql += ` and title like '%${keywords}%'`
  }
  _sql += ` order by id desc limit ${(page - 1) * pageSize},${pageSize};`
  console.log(_sql);
  return query(_sql);

  // let _sql = '';
  // if (field == -1) {
  //   _sql = `select * from course_field_list where title like '%${keywords}%' order by id asc limit ${(page - 1) *
  //     10},${pageSize};`
  // } else {
  //   _sql = `select * from course_field_list where fieldType = ${field} and title like '%${keywords}%' order by id asc limit ${(page - 1) *
  //     10},${pageSize};`
  // }
  // console.log(_sql)
  // return query(_sql);
}


// 新增课程分类信息
exports.add_course_cate = (value) => {
  let _sql = "insert into course_field set fieldName=?,fieldType=?;";
  console.log(_sql);
  return query(_sql, value);
}

// 修改课程分类信息
exports.update_course_cate = (value) => {
  let _sql = `update course_field set fieldName=? where id=?`;
  console.log(_sql);
  return query(_sql, value);
}


// 查询课程分类下面的课程列表数目

exports.course_list_count_by_course_cate = (fieldType) => {
  let _sql = `select count(*) as count,GROUP_CONCAT(id) as Ids from course_field_list where fieldType = ${fieldType}`;
  console.log(_sql);
  return query(_sql);
}


// 删除课程分类信息
exports.course_cate_delete = (id) => {
  let _sql = `delete from course_field where id = ${id}`;
  console.log(_sql);
  return query(_sql);
}

// 删除课程分类操作时,删除分类下面对应的课程列表数据.
exports.course_list_delete = (ids) => {
  let _sql = `delete from course_field_list where id in (${ids})`;
  console.log(_sql);
  return query(_sql);
}


// 新增课程信息
exports.add_course_info = (value) => {
  let _sql = "insert into course_field_list set title=?,description=?,author=?,fieldType=?,thumb=?,price=?,studying=?,content=?,createtime=?;";
  console.log(_sql);
  return query(_sql, value);
}


// 课程详情信息
// get_course_detail_info

exports.get_course_detail_info = (courseId) => {
  let _sql = `select * from course_field_list where id = ${courseId}`;
  console.log(_sql);
  return query(_sql, courseId);
}