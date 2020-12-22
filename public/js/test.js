function ajax(obj) {
  var xhr
  if (window.XMLHttpRequest) { // IE7以上浏览器
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP") // 只有IE6支持此对象
  }

  xhr.open(obj.type, obj.url, obj.async)

  // 除了登陆，其他接口需要加上token
  if (obj.url.indexOf('login') === -1 && sessionStorage.getItem('token')) {
    xhr.setRequestHeader("token", sessionStorage.getItem('token'))
  }

  if (obj.type.toLowerCase() == "get") {
    xhr.send()
  } else if (obj.type.toLowerCase() == "post") {
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
    xhr.send(JSON.stringify(obj.data))
  }

  // 操作返回的数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //1.readyState属性:ajax工作状态
      //2.每当readyState的值发生改变时,就会触发         onreadystatechange事件
      //存有XMLHttpRequest的状态.从0-4发生变化
      //0:请求未初始化
      //1:服务器连接已建立
      //2:请求已接收
      //3:请求处理中
      //4:请求已完成,且响应已就绪

      //http状态码
      //200代表请求成功
      //403禁止访问
      //404文件未找到
      //500服务器错误
      //对responseText进行json转化
      var data = JSON.parse(xhr.responseText)
      obj.success(data)
    }
  }
}

function login() {
  ajax({
    type: 'post',
    url: 'http://127.0.0.1:3000/users/login',
    data: {
      UserName: "admin",
      PassWord: "admin"
    },
    async: true,
    success: function (res) {
      console.log(res);
      sessionStorage.setItem('token', res.data.token)
    }
  })
}

var regist = function () {
  console.log('regist');
  ajax({
    type: 'post',
    url: 'http://127.0.0.1:3000/users/add',
    data: {
      UserName: "admin02",
      PassWord: "admin02",
      NickName: "babala",
      Sex: 0,
      Age: 20,
      InviteCode: 123321,
    },
    async: true,
    success: function (res){
      console.log(res);
    }
  })
}

function getlist() {
  ajax({
    type: 'get',
    url: 'http://127.0.0.1:3000/users/userList',
    async: true,
    success: function (res) {
      console.log(res);
    }
  })
}