var express = require('express');
var router = express.Router();
let { add, deleted, query, queryAll, update } = require("../config/sql/user_dao.js"); // 数据库操作

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '我的地盘' });
});

// 添加用户 post请求
router.post('/adduser', function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});
//update
router.post('/updataUser', function (req, res, next) {
  let urlParam = req.body;
  update(urlParam, function (success) {
    res.json({
      status: "200",
      data: success
    });
  })
});
// 删除指定用户 get请求
router.get('/userDeleteByid', function (req, res, next) {
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
