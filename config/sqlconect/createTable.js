let { pool } = require("./mysqlConf.js")

var sql_users = `CREATE TABLE if not exists user (id int auto_increment primary key not null, account VARCHAR(255), passWord VARCHAR(255), nickName VARCHAR(255), signature VARCHAR(255), headIcon VARCHAR(255), sex VARCHAR(1), age VARCHAR(3), roleId VARCHAR(6), createTime VARCHAR(20))`;

pool.query(sql_users, function (err, result) {
  if (err) throw err;
  console.log("users created");
});

var sql_musics = `CREATE TABLE if not exists music (id int auto_increment primary key not null, name VARCHAR(255), author VARCHAR(255), type VARCHAR(2), cover VARCHAR(255), musicUrl VARCHAR(255),lyric VARCHAR(1000), createTime VARCHAR(20))`;

pool.query(sql_musics, function (err, result) {
  if (err) throw err;
  console.log('musics created')
})

var sql_role = `CREATE TABLE if not exists role (id int auto_increment primary key not null, roleName VARCHAR(255), menu VARCHAR(1000), intro VARCHAR(255), status VARCHAR(10))`;

pool.query(sql_role, function (err, result) {
  if (err) throw err;
  console.log('roles created')
})


var sql_article = `CREATE TABLE if not exists article (id int auto_increment primary key not null, title VARCHAR(255), author VARCHAR(255),abstract VARCHAR(255), content TEXT(50000), createTime VARCHAR(20), type VARCHAR(2) )`;

pool.query(sql_article, function (err, result) {
  if (err) throw err;
  console.log('articles created');
})

var sql_label = `CREATE TABLE if not exists label (id int auto_increment primary key not null, name VARCHAR(255), content VARCHAR(255), type VARCHAR(2))`;

pool.query(sql_label, function (err, result) {
  if (err) throw err;
  console.log('labels created');
})





// 添加初始数据 格式化当前时间  
let { formatTime } = require("../../tool/tool.js")

let nowDate = formatTime(new Date().getTime())

let sqlparam1 = ['qz', 'qz666', '翩若惊鸿，宛若游龙', '1', '18', 'Signature', 'HeadIcon', nowDate, 1]
pool.query(`INSERT INTO user (account , passWord, nickName, sex, age, signature, headIcon, createTime, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, sqlparam1, function (error, result) {
  if (error) throw error;
  console.log('users created id=1')
});


let sqlparam2 = ['封弊者', '天上天下唯我独尊', '[100]', '1']
pool.query("INSERT INTO role (roleName , intro, menu, status) VALUES (?, ?, ?, ?);", sqlparam2, function (error, result) {
  if (error) throw error;
  console.log('roles created id=0')
});