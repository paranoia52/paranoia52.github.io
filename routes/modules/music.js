var express = require('express');
var router = express.Router();
let { add, query } = require("../../config/modules/user_dao.js"); // 数据库操作

// 添加用户 post请求
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    res.json(success);
  })
});
// 获取用户信息 post请求
router.post('/query', function (req, res, next) {
  let urlParam = req.body;
  query(urlParam, function (success) {
    res.json(success);
  })
});