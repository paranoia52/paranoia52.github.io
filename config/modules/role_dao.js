let { pool } = require("../sqlconect/mysqlConf.js")

module.exports = {
  query: function (params, callback) {
    pool.query(`SELECT * FROM roles ORDER BY id DESC`, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result, msg: '' });
    });
  },
  add: function (params, callback) {
    let sqlparam = [
      params.RoleName,
      params.Intro,
      params.Menu.join(),
      params.id || 1
    ]
    if (params.RoleName && params.Intro) {
      if (params.id) {
        pool.query("UPDATE roles set RoleName = ?,Intro = ?,Menu = ? where id = ?;", sqlparam, function (error, result) {
          if (error) throw error;
          callback({ code: 0, data: result, msg: '更新成功' });
        });
      } else {
        pool.query("INSERT INTO roles (RoleName , Intro, Menu, Status ) VALUES (?, ?, ?, ?);", sqlparam, function (error, result) {
          if (error) throw error;
          callback({ code: 0, data: result, msg: '添加成功' });
        });
      }
    } else {
      callback({ code: 401, data: '', msg: '请检查参数' });
    }
  },
}