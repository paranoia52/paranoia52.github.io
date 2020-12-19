let mysql = require("mysql")

let mysql_config = { // mysql采用pool连接池基础配置
    connectionLimit: 10, // 最大连接数
    host: '127.0.0.1', // 本地搭建则本机ip,远程服务器则远程服务器ip 
    post: '3306',
    user: 'root', // mysql 账户
    password: 'root', // mysql 密码
    database: 'msdata' // 要操作的数据库// 这里等数据库创建之后放开就可以
}
let pool = mysql.createConnection(mysql_config); // 创建连接
//connect 连接数据库
pool.connect(err => {
    if (err) throw err;
    console.log('mysql connected ......')
})
// let sql = 'CREATE DATABASE  lpsDatabase'
// pool.query(sql,(err,result) => {
//     if(err) throw err
//     // console.log(result)
//     console.log('Database created ...')
// })
var sql = "CREATE TABLE if not exists users (id INT(30), UserName VARCHAR(255), PassWord VARCHAR(255), NickName VARCHAR(255), Sex INT(1), Age INT(3), InviteCode INT(6), CreateTime TIMESTAMP(6))";
pool.query(sql, function (err, result) {
if (err) throw err;
  console.log("users created");
});
// var sql2 = "CREATE TABLE if not exists music (id INT(30), Name VARCHAR(255), Author VARCHAR(255), Type INT(2), Cover VARCHAR(255))"
// var sql3 = "CREATE TABLE if not exists article (id INT(30), Title VARCHAR(255))"
module.exports = {
    pool
}