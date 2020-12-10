let { pool } = require("../mysqlConf.js")

module.exports = {
  add: function (user, callback) { // users表中增加user操作
    let sqlparam = [
      user.username ? user.username : null,
      user.password ? user.password : null
    ]
    pool.query("SELECT * FROM users WHERE username = ?;", sqlparam[0],function (error, result){
      if (error) throw error;
      if(result.length){
        callback('账号已存在')
      } else{
        pool.query("INSERT INTO users (username , password) VALUES (?, ?);", sqlparam, function (error, result) {
          if (error) throw error;
          callback(result);
        });
      }
    })
    
  },
  deleted: function (params, callback) { // users表中删除指定user操作
    let { id } = params
    let sqlparam = [id]
    pool.query("DELETE FROM users WHERE id = ?;", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
  query: function (params, callback) { // users表中查询指定user操作
    let { id } = params
    let sqlparam = [id]
    pool.query("SELECT id,username FROM users WHERE id = ?;", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result[0]);
    });
  },
  queryAll: function (params, callback) { // users表中查询全部user操作
    pool.query("SELECT id,username FROM users", params, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
  update: function (params, callback) { // users表中更新user操作
    pool.query("UPDATE users set username= ? where id = ?;", [params.username, params.id], function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
  login: function (params, callback) { // 登录操作
    pool.query("SELECT id,username FROM users where username = ? and password = ?;", [params.username, params.password], function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
}