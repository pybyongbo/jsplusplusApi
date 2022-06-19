const courseModel = require("../lib/mysql.js");

/**
 * 返回值
 * @param code 返回码
 * @param msg	返回信息
 * @param data 返回数据
 * @return
 */

var resObj = (code, msg, data) => {
  return {
    status: code,
    msg: msg,
    data: data
  }
}

const fdata = async (data) => {

  const promises = data.map(async item => {
    // console.log('item111', item);
    const listItem = await courseModel.get_field_course_list(item.fieldType, '', 1, 100).then(res => res.length);
    return listItem;

  });

  const listItems = await Promise.all(promises);
  console.log('promises', promises);
  console.log('result listItems', listItems);
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
  let { field = -1, keywords = "", page, pageSize } = ctx.query;
  let totalCount;
  console.log('keywords', keywords);
  await courseModel.findCourseListTotalCount(keywords, field).then(result => {
    totalCount = result[0].count
  })
  await courseModel
    .get_field_course_list(field, keywords, page, pageSize)
    .then(result => {
      ctx.body = {
        code: 0,
        message: "成功",
        result: result,
        total: totalCount,
        cpage: +page,
        pageLength: Math.ceil(totalCount / pageSize),
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


//更新课程分类信息  courseCateUpdate
exports.courseCateUpdate = async ctx => {
  let { fieldName, id } = ctx.request.body;
  await courseModel.update_course_cate([fieldName, id]).then(() => {
    ctx.body = {
      code: 0,
      message: "课程分类更新成功"
    };
  })
    .catch(() => {
      ctx.body = {
        code: 500,
        message: "更新失败"
      };
    });
}

// 删除操作前,先查询该分类下面是否有课程列表数据

exports.findCourseListByCourseFieldType = async ctx => {
  let { fieldType } = ctx.request.body;

  await courseModel.course_list_count_by_course_cate(fieldType).then(result => {
    let idsStr = result[0].Ids;
    let idsArr = idsStr ? idsStr.split(',').map(item => +item) : [];

    ctx.body = {
      code: 0,
      result: {
        listCount: result[0].count,
        ids: idsArr
      },
      message: "查询成功"
    };
  }).catch(() => {
    ctx.body = {
      code: 500,
      message: "查询失败"
    };
  });

}


// 删除课程分类对应的课程列表数据

// exports.courseListDelete = async ctx => {
//   let { ids } = ctx.request.body;
//   await courseModel.course_list_delete([ids]).then(() => {
//     ctx.body = {
//       code: 0,
//       message: "课程分类下对应列表删除成功"
//     };
//   })
//     .catch(() => {
//       ctx.body = {
//         code: 500,
//         message: "删除失败"
//       };
//     });
// }


// 删除课程分类信息 courseCateDelete

exports.courseCateDelete = async ctx => {
  let { id, ids } = ctx.request.body;
  // console.log('ids', ids);
  // return;

  // 删除该课程分类的数据
  await courseModel.course_cate_delete([id]).then(() => {
    ctx.body = {
      code: 0,
      message: "课程分类删除成功"
    };
  })
    .catch(() => {
      ctx.body = {
        code: 500,
        message: "删除失败"
      };
    });

  // 同时删除该分类下面的课程列表数据.
  await courseModel.course_list_delete([ids].toString());
}


// 新增课程信息
exports.courseCreate = async ctx => {
  let { title, fieldType, thumb, price, studying } = ctx.request.body;
  await courseModel.add_course_info([title, fieldType, thumb, price, studying]).then(() => {
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

exports.courseThumbUpload = async (ctx, next) => {
  // console.log('ctx.request', ctx.request, ctx)
  try {
    let fileName = ctx.req.file.filename
    let resData = {}
    resData.fileName = fileName
    resData.filePath = 'uploads/' + fileName
    resData.hostName = ctx.request.host;
    ctx.body = resObj(0, '上传成功', resData)
  } catch (e) {
    ctx.body = resObj(500, '上传出错', e.toString())
  }
}