var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs') // 设置模板引擎
require('./config/mysqlConf.js'); // 操作数据库文件
const multer = require('multer'); // 上传文件依赖

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/modules/users');
var globaltoken = require('./config/jsonwebtoken/globaltoken')

var app = express();

// view engine setup  jade模板换成html
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("Content-Type", "application/json;charset=utf-8");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  // 让options尝试请求快速结束
  } else {
    next();
  }
});
app.use(globaltoken) // 全局验证token

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({ storage: storage })
app.post('/upload', upload.any(), function (req, res, next) {
  // console.log(req.files[0]);  // 上传的文件信息
  res.send('{ "msg" : "upload seccessed", "url": "http://127.0.0.1:3000/upload/' + req.files[0].filename + '"}')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
