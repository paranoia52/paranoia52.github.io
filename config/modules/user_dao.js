let { pool } = require("../sqlconect/mysqlConf.js")
var tokenApi = require("../jsonwebtoken/index")

// handleAdd, handleDel, handleInq, handleLogin


// 添加初始数据 格式化当前时间  
let { formatTime } = require("../../tool/tool.js")

let nowDate = formatTime(new Date().getTime())

module.exports = {
  handleLogin: function (params, callback) { // 登录操作
    let sqlparam = [params.account, params.passWord]
    pool.query(`SELECT * FROM user WHERE account = ? AND passWord = ?;`, sqlparam, function (error, result) {
      if (error) throw error;
      if (!result.length) {
        callback({ code: 401, data: null, msg: '账号或密码错误' })
      } else {
        let { account, id } = { ...result[0] }
        const handleToken = async () => {
          let token = await tokenApi.setToken(account, id, true)
          pool.query(`SELECT * FROM user INNER JOIN role ON user.roleId = role.id WHERE user.id = ${result[0].id} ;`, function (error, result2) {
            if (error) throw error;
            const userInfo = result2[0]
            delete userInfo.passWord
            callback({ code: 0, msg: '登陆成功', token, userInfo });
          })
        }
        handleToken()
      }
    });
  },
  handleAdd: function (params, callback) { // users表中增加user操作
    let sqlparam = Object.values(params)
    sqlparam.push(nowDate)

    pool.query("SELECT * FROM user WHERE account = ?;", sqlparam[0], function (error, result) {
      if (error) throw error;
      if (result.length) {
        callback({ code: 401, data: null, msg: '账号已存在' })
      } else {
        pool.query("INSERT INTO user (account , passWord, nickName, signature, sex, age, roleId, headIcon, createTime ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
          if (error) throw error;
          console.log('result', result);
          callback({ code: 0, data: null, msg: '注册成功' });
        });
      }
    })
  },
  handleDel: function (params, callback) { // users表中删除指定user操作
    let sqlparam = [params.id]
    pool.query("DELETE FROM user WHERE id = ?;", sqlparam, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: null, msg: '删除成功' });
    });
  },
  handleInq: function (params, callback) { // users表中查询指定user操作    关键字 ASC 表示按升序分组，关键字 DESC 表示按降序分组
    let toalCount = 0
    pool.query(`SELECT COUNT(*) FROM  user`, function (error, result2) {
      if (error) throw error;
      toalCount = result2[0]['COUNT(*)']
    });
    if (params.KeyType == 0) {
      pool.query(`SELECT * FROM user ORDER BY id ASC limit ${((params.pageNo || 1) - 1) * 10},10`, params, function (error, result) {
        if (error) throw error;
        const userList = userListFilter(result)
        callback({ code: 0, data: userList, msg: '', toalCount });
      });
    } else {
      pool.query(`SELECT * FROM user WHERE ${params.KeyType == 2 ? 'NickName' : 'id'} LIKE '%${params.Keyword}%' ORDER BY id ASC limit ${((params.pageNo || 1) - 1) * 10},10`, function (error, result) {
        if (error) throw error;
        const userList = userListFilter(result)
        callback({ code: 0, data: userList, msg: '', toalCount });
      });
    }
  },
}

function userListFilter(data) {
  data.map((ele) => {
    delete ele.passWord
  })
  return data
}