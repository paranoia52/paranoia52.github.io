let { pool } = require("../sqlconect/mysqlConf.js")
var tokenApi = require("../jsonwebtoken/index")

module.exports = {
  login: function (params, callback) { // 登录操作
    console.log([params.UserName, params.PassWord]);
    pool.query("SELECT * FROM users where UserName = ? and PassWord = ?;", [params.UserName, params.PassWord], function (error, result) {
      if (error) throw error;
      if (!result.length) {
        callback({ code: 401, data: null, msg: '账号或密码错误' })
      } else {
        tokenApi.setToken(result[0].UserName, result[0].id, true).then(res => {
          delete result[0].PassWord
          callback({ code: 0, data: { res: result[0], token: res }, msg: '登陆成功' });
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
      user.Signature,
      user.HeadIcon,
      new Date(),
      2,
    ]
    pool.query("SELECT * FROM users WHERE UserName = ?;", sqlparam[0], function (error, result) {
      if (error) throw error;
      if (result.length) {
        callback({ code: 401, data: null, msg: '账号已存在' })
      } else {
        pool.query("INSERT INTO users (UserName , PassWord, NickName, Sex, Age, Signature, HeadIcon, CreateTime, RoleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
          if (error) throw error;
          callback({ code: 0, data: result, msg: '注册成功' });
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
    if (params.KeyType == 1) {// 0是全部  1是ID  2是昵称
      pool.query(`SELECT * FROM users WHERE id LIKE '%${params.Keyword}%' ORDER BY id DESC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: pageFilter(result, params.pageNo - 1), msg: '' });
      });
    } else if (params.KeyType == 2) {
      pool.query(`SELECT * FROM users WHERE NickName LIKE '%${params.Keyword}%' ORDER BY id DESC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: pageFilter(result, params.pageNo - 1), msg: '' });
      });
    } else if (params.KeyType == 0) {
      pool.query("SELECT * FROM users ORDER BY id DESC", params, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: pageFilter(result, params.pageNo - 1), msg: '' });
      });
    } else {
      callback({ code: 401, data: null, msg: '请检测参数' });
    }
  },
  update: function (params, callback) { // users表中更新user操作
    let sqlparam = [
      params.NickName,
      params.Sex,
      params.Age,
      params.Signature,
      params.HeadIcon,
      params.id,
    ]
    pool.query("UPDATE users set NickName = ?,Sex = ?,Age = ?,Signature = ?,HeadIcon = ? where id = ?;", sqlparam, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result, msg: '更新成功' });
    });
  },
}

function pageFilter(data, pageNo) {
  if (data.length < 11) {
    return {
      data: data,
      total: data.length,
      pageNo: pageNo
    }
  } else {
    return {
      data: data.slice(10 * pageNo, (10 * pageNo + 10)),
      total: data.length,
      pageNo: pageNo + 1
    }
  }
}