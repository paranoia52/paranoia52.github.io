const express = require('express')
const multer = require('multer')
let server = express();

//文件上传到服务器的位置
let obj = multer({ dest: './static/upload' })

//这里可以对上传的文件做一些限制，咱们这里不做任何限制
server.use(obj.any())

server.post('/upload', (req, res) => {
    //send同时具有end()的结束功能
    res.send('upload seccessed')
})