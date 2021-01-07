var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 日志组件
var ejs = require('ejs') // 设置模板引擎
require('./config/sqlconect/mysqlConf.js'); // 操作数据库文件

var app = express();

// 视图引擎设置html
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

require('./config'); 