var express = require('express');
var router = express.Router();
let { add, query, del } = require("../../config/modules/role_dao.js"); // 数据库操作

// 添加角色
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    res.json(success);
  })
});
// 获取角色列表
router.post('/query', function (req, res, next) {
  let urlParam = req.body;
  query(urlParam, function (success) {
    res.json(success);
  })
});
// 删除角色
router.get('/del', function (req, res, next) {
  del(req.query.id, function (success) {
    res.json(success);
  })
});

module.exports = router;