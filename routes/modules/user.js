var express = require('express');
var router = express.Router();
let { handleAdd, handleDel, handleInq, handleLogin } = require("../../config/modules/user_dao.js"); // 数据库操作

// 登录操作
router.post('/login', function (req, res, next) {
  handleLogin(req.body, function (success) {
    res.json(success);
  })
});
// 添加用户 post请求
router.post('/add', function (req, res, next) {
  handleAdd(req.body, function (success) {
    res.json(success);
  })
});
// 删除指定用户 get请求
router.get('/del', function (req, res, next) {
  handleDel(req.query, function (success) {
    res.json(success);
  })
});
// 获取用户信息 post请求
router.post('/inquiry', function (req, res, next) {
  handleInq(req.body, function (success) {
    res.json(success);
  })
});


module.exports = router;
