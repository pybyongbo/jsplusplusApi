const router = require('koa-router')()
const controller = require('../controller/course.js')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message:'by bibilili jsplusplus api'
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
router.get('/getcoursefield', controller.getFieldCourse)

//课程分类列表数据
router.get('/getcoursefieldlist', controller.getFieldCourseList)

module.exports = router
