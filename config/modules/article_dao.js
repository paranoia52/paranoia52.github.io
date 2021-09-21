let { pool } = require("../sqlconect/mysqlConf.js")

// 添加初始数据 格式化当前时间  
let { formatTime } = require("../../tool/tool.js")

let nowDate = formatTime(new Date().getTime())

module.exports = {
  handleInq: function (params, callback) {
    // pool.query(`SELECT * FROM article ORDER BY id DESC`, function (error, result) {
    //   if (error) throw error;
    //   callback({ code: 0, data: result, msg: '查询成功' });
    // });
    console.log('params', params);
    if (params.KeyType == 0) {
      pool.query(`SELECT * FROM article ORDER BY id ASC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    } else {
      pool.query(`SELECT * FROM article WHERE type = ${params.KeyType} ORDER BY id ASC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    }
  },
  handleAdd: function (params, callback) {
    let sqlparam = [
      params.title,
      params.author,
      params.abstract,
      params.content,
      params.type,
    ]
    sqlparam.push(nowDate)

    if (params.id) {
      sqlparam.push(params.id)
    }

    console.log(sqlparam);
    if (params.id) {
      pool.query("UPDATE article set title = ?,author = ?, abstract = ?, content = ? ,type = ? ,createTime = ? where id = ?;", sqlparam, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: null, msg: '更新成功' });
      });
    } else {
      pool.query("INSERT INTO article (title , author, abstract, content, type, createTime ) VALUES (?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: null, msg: '添加成功' });
      });
    }
  },
  handleDel: function (params, callback) {
    pool.query("DELETE FROM article WHERE id = ?;", params, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result, msg: '删除成功' });
    });
  },
  handleDetail: function (params, callback) {
    pool.query("SELECT * FROM article WHERE id = ?;", params, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result[0], msg: '查询成功' });
    });
  },
}