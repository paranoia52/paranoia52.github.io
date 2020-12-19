var express = require('express');
var router = express.Router();
let { add, deleted, query, queryAll, update, login } = require("../../config/sql/user_dao.js"); // 数据库操作

// 登录操作
router.post('/login', function (req, res, next) {
  let urlParam = req.body;
  login(urlParam, function (success) {
    res.json(success);
  })
});
// 添加用户 post请求
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    res.json(success);
  })
});
//update
router.post('/updata', function (req, res, next) {
  let urlParam = req.body;
  update(urlParam, function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});
// 删除指定用户 get请求
router.get('/DeleteByid', function (req, res, next) {
  let urlParam = {
    id: req.query.id
  };
  console.log(urlParam);
  deleted(urlParam, function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});
// 获取指定用户信息 get请求
router.get('/userDetail', function (req, res, next) {
  let urlParam = {
    id: req.query.id
  };
  query(urlParam, function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});
// 获取全部用户信息 get请求
router.get('/userList', function (req, res, next) {
  queryAll([], function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});


module.exports = router;
