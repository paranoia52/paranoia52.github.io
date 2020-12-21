let { pool } = require("../mysqlConf.js")
var tokenApi = require("../jsonwebtoken/index")

module.exports = {
  login: function (params, callback) { // 登录操作
    console.log([params.UserName, params.PassWord]);
    pool.query("SELECT id,UserName,NickName,Sex,Age,CreateTime FROM users where UserName = ? and PassWord = ?;", [params.UserName, params.PassWord], function (error, result) {
      if (error) throw error;
      if (!result.length) {
        callback({ code: 401, data: null, msg: '账号或密码错误' })
      } else {
        tokenApi.setToken(result.id, result.UserName, true).then(res => {
          callback({ code: 200, data: { res: result[0], token: res }, msg: '请求成功' });
        })
      }
    });
  },
  add: function (user, callback) { // users表中增加user操作
    let sqlparam = [
      user.UserName,
      user.PassWord,
      user.NickName,
      user.Sex,
      user.Age,
      user.InviteCode,
      new Date()
    ]
    console.log(sqlparam);
    if (sqlparam[5] !== '123321') {
      callback({ code: 401, data: null, msg: '邀请码不正确' })
      return
    } else {
      pool.query("SELECT * FROM users WHERE UserName = ?;", sqlparam[0], function (error, result) {
        if (error) throw error;
        if (result.length) {
          callback({ code: 401, data: null, msg: '账号已存在' })
        } else {
          pool.query("INSERT INTO users (UserName , PassWord, NickName, Sex, Age, InviteCode, CreateTime) VALUES (?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
            if (error) throw error;
            callback({ code: 200, data: result, msg: '注册成功' });
          });
        }
      })
    }

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
    pool.query("SELECT id,UserName,NickName,Sex,Age,CreateTime FROM users", params, function (error, result) {
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
}