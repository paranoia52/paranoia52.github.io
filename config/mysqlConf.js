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
var sql = "CREATE TABLE if not exists users (id INT, username VARCHAR(255), password VARCHAR(255))";
pool.query(sql, function (err, result) {
if (err) throw err;
  console.log("Table created");
});

module.exports = {
    pool
}