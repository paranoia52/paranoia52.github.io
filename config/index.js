var app = require('../app');
var createError = require('http-errors');

// 允许跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200);  // 让options尝试请求快速结束
  } else {
    next();
  }
});

// 验证token中间件
var globaltoken = require('./jsonwebtoken/globaltoken')
app.use(globaltoken)

// 文件上传
var multer = require('multer'); // 上传文件依赖

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
app.use('/upload', upload.any(), function (req, res, next) {
  // console.log(req.files[0]);  // 上传的文件信息
  res.send('{ "msg" : "upload seccessed", "url": "http://47.243.133.60:3000/upload/' + req.files[0].filename + '"}')
})


// 路由模块
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/modules/user');
var musicRouter = require('../routes/modules/music');
var roleRouter = require('../routes/modules/role');
var articleRouter = require('../routes/modules/article');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/music', musicRouter);
app.use('/role', roleRouter);
app.use('/article', articleRouter);


// 所有路由定义完之后，最后做404处理 
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