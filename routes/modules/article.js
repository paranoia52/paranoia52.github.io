var express = require('express');
var router = express.Router();
let { handleAdd, handleInq, handleDel, handleDetail } = require("../../config/modules/article_dao.js"); // 数据库操作

// 添加角色
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  handleAdd(urlParam, function (success) {
    res.json(success);
  })
});
// 获取角色列表
router.post('/inquiry', function (req, res, next) {
  let urlParam = req.body;
  handleInq(urlParam, function (success) {
    res.json(success);
  })
});
// 删除角色
router.get('/del', function (req, res, next) {
  handleDel(req.query.id, function (success) {
    res.json(success);
  })
});
// 删除角色
router.get('/detail', function (req, res, next) {
  handleDetail(req.query.id, function (success) {
    res.json(success);
  })
});

module.exports = router;