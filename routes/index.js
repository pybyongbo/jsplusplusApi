const router = require('koa-router')()
const controller = require('../controller/course.js');
const multer = require('koa-multer');

// const multer = require('multer');

//上传配置  
const storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称  
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
const limits = {
  fieldSize: '2MB',
  files: 5
}
//加载配置  
const upload = multer({ storage: storage, limits: limits });
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: 'by bibilili jsplusplus api'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//课程所有分类列表
router.get('/course/get_course_fields', controller.getFieldCourse);

//课程分类列表数据
router.get('/course/get_courses/all', controller.getFieldCourseList);

// 新增课程分类信息
router.post('/course/course_cate_create', controller.courseCateCreate);

// 修改课程分类信息
router.post('/course/course_cate_update', controller.courseCateUpdate);

// 删除课程分类判断该分类下面是否有课程列表数据
router.post('/course/course_list_by_cate', controller.findCourseListByCourseFieldType);

// 删除课程分类信息
router.post('/course/course_cate_delete', controller.courseCateDelete);


//图片上传 (缩略图)
router.post('/course/course_thumb_upload', upload.single('thumb'), controller.courseThumbUpload);

// router.post('/course/course_thumb_upload', upload.single('thumb'), async (ctx, next) => {
//   ctx.body = {
//     filename: ctx.req.file.filename,//返回文件名
//     body: ctx.req.body
//   }
// });


// 新增课程信息
router.post('/course/course_create', controller.courseCreate);

module.exports = router
