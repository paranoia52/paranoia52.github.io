var express = require('express');
var router = express.Router();
let { handleAdd, handleInq, handleDel } = require("../../config/modules/music_dao.js"); // 数据库操作

// 添加歌曲
router.post('/add', function (req, res, next) {
  let urlParam = req.body;
  handleAdd(urlParam, function (success) {
    res.json(success);
  })
});
// 获取歌曲列表
router.post('/inquiry', function (req, res, next) {
  let urlParam = req.body;
  handleInq(urlParam, function (success) {
    res.json(success);
  })
});
// 删除 get请求
router.get('/del', function (req, res, next) {
  handleDel(req.query, function (success) {
    res.json(success);
  })
});

module.exports = router;