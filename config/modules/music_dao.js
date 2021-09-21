let { pool } = require("../sqlconect/mysqlConf.js")

// 添加初始数据 格式化当前时间  
let { formatTime } = require("../../tool/tool.js")

let nowDate = formatTime(new Date().getTime())
// id , name (255), author (255), type (2), cover (255), musicUrl (255),lyric (1000), createTime (20))
module.exports = {
  handleInq: function (params, callback) {
    console.log('params', params);
    if (params.KeyType == 0) {
      pool.query(`SELECT * FROM music ORDER BY id ASC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    } else {
      pool.query(`SELECT * FROM music WHERE type = ${params.KeyType} ORDER BY id ASC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    }
  },
  handleAdd: function (params, callback) {
    let sqlparam = [params.name, params.author, params.cover, params.musicUrl, params.lyric, params.type, nowDate]
    pool.query("INSERT INTO music (name , author, cover, musicUrl, lyric, type, createTime ) VALUES (?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: null, msg: '添加成功' });
    });
  },

  handleDel: function (params, callback) { // users表中删除指定user操作
    let sqlparam = [params.id]
    console.log(sqlparam);
    pool.query("DELETE FROM music WHERE id = ?;", sqlparam, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: null, msg: '删除成功' });
    });
  },
}