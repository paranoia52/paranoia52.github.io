var express = require('express');
var router = express.Router();
let { add, query } = require("../../config/modules/role_dao.js"); // 数据库操作

// 添加歌曲
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    res.json(success);
  })
});
// 获取歌曲列表
router.post('/query', function (req, res, next) {
  let urlParam = req.body;
  query(urlParam, function (success) {
    res.json(success);
  })
});

module.exports = router;