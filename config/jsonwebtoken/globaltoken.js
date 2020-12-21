// token 验证中间件
let { pool } = require("../mysqlConf.js")
var tokenApi = require("../jsonwebtoken/index")
module.exports = ((req, res, next) => {
  // 获取当前访问的api地址
  const url = req.originalUrl
  // 不需要进行验证的api
  // var urlArr = ['/users/login']
  // // 验证当前的api是否存在不需要验证的api的列表里面
  // var is_next = urlArr.find(item => item === url)
  // if (is_next) {
  //   next()
  //   return false
  // }
  var urlArr = ['/users/userList']
  // 验证当前的api是否存在不需要验证的api的列表里面
  var is_next = urlArr.find(item => item === url)
  if (!is_next) {
    next()
    return
  }
  // 获取api传递过来的token
  const token = req.headers.token || ''
  if (token == '') {
    return res.json({
      code: 401,
      msg: '没有token呢，怎么办？ 先去登陆吧！'
    })
  }
  tokenApi.verToken(token).then(res => {
    console.log(res);
    next()
  })

})