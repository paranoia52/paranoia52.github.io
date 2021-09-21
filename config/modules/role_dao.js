let { pool } = require("../sqlconect/mysqlConf.js")

module.exports = {
  handleInq: function (params, callback) {
    pool.query(`SELECT * FROM role ORDER BY id DESC`, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result, msg: '' });
    });
  },
  handleAdd: function (params, callback) {
    let sqlparam = [
      params.roleName,
      params.intro,
      params.menu,
      '1',
    ]
    if (params.id) {
      sqlparam.push(params.id)
    }
    console.log(sqlparam);
      if (params.id) {
        pool.query("UPDATE role set roleName = ?,intro = ?, menu = ?, status = ? where id = ?;", sqlparam, function (error, result) {
          if (error) throw error;
          callback({ code: 0, data: null, msg: '更新成功' });
        });
      } else {
        pool.query("INSERT INTO role (roleName , intro, menu, status ) VALUES (?, ?, ?, ?);", sqlparam, function (error, result) {
          if (error) throw error;
          callback({ code: 0, data: null, msg: '添加成功' });
        });
      }
  },
  handleDel: function (params, callback) {
    if (params > 1) {
      pool.query("DELETE FROM role WHERE id = ?;", params, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '删除成功' });
      });
    } else {
      callback({ code: 401, data: '', msg: '此角色不可删除' });
    }
  },
}