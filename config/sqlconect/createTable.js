let { pool } = require("./mysqlConf.js")

// var sql_createDatabase = 'CREATE DATABASE  msdata'
// pool.query(sql_createDatabase, (err, result) => {
//   if (err) throw err
//   console.log('Database created ...')
// })

var sql_users = "CREATE TABLE if not exists users (id INT(30), UserName VARCHAR(255), PassWord VARCHAR(255), NickName VARCHAR(255), Signature VARCHAR(255), HeadIcon VARCHAR(255), Sex INT(1), Age INT(3), RoleId INT(6), CreateTime TIMESTAMP(6))";
pool.query(sql_users, function (err, result) {
  if (err) throw err;
  console.log("users created");
});

var sql_musics = "CREATE TABLE if not exists musics (id INT(30), Title VARCHAR(255), Author VARCHAR(255), Type INT(2), Cover VARCHAR(255), MusicUrl VARCHAR(255),Lyric VARCHAR(255), CreateTime TIMESTAMP(6))";
pool.query(sql_musics, function (err, result) {
  if (err) throw err;
  console.log('musics created')
})

var sql_role = "CREATE TABLE if not exists roles (id INT(30), RoleName VARCHAR(255), Menu VARCHAR(255), Intro VARCHAR(255), Status INT(10))";
pool.query(sql_role, function (err, result) {
  if (err) throw err;
  console.log('roles created')
})

var sql_article = "CREATE TABLE if not exists articles (id INT(30), UserId INT(30), Title VARCHAR(255), Author VARCHAR(255), Content VARCHAR(5000), CreateTime TIMESTAMP(6) )";
pool.query(sql_article, function (err, result) {
  if (err) throw err;
  console.log('articles created');
})