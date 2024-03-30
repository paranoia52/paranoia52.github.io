---
title: notes
date: 2020-01-01 12:00:01
excerpt: notes
comments: false   # true/false对应开启/关闭本文章评论
sticky: false   # 置顶文章
tags:
  - 前端
categories:
  - [学习]
cover: http://127.0.0.1/static/bg4.png # 文章顶部和文章介绍图（将覆盖文章主页轮播图）
audio: false
---

# js常用功能

1. 获取时间

  ``` bash
    var date = new Date()

  Date.parse(date)    // 获取时间戳（后3位000）
  date.getTime()      // 获取时间戳
  date.getFullYear()  // 获取完整的年份(4位)
  date.getMonth()     // 获取当前月份(0-11,0代表1月)
  date.getDate()      // 获取当前日(1-31)
  date.getDay()       // 获取当前星期X(0-6,0代表星期天)
  
  new Date(year, month, 0).getDate()  // 获取当月有多少天
  ```


2. h5唤起app

  ``` bash
    download() {
    const schemeUrl = "happyvoice://app/main"
    if(isIOS()) {
      window.location.href = schemeUrl
      setTimeout(()=>{
        window.location.href = this.downloadlink
      },500)
    } else{
      var r = document.createElement("iframe");
        (r.src = schemeUrl), (r.style.display = "none"), document.body.appendChild(r);
      setTimeout(()=>{
        document.body.removeChild(r);
        window.location.href = this.downloadlink
      },500)
    }
  }
  ```

3. 原生ajax封装

  ``` bash
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
        url: 'http://localhost:3001/users/login',
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
  ```



# 项目遇到的问题
  -  vue 如何实现点击子元素不触发父元素事件  子元素事件用stop修饰符

  -  Element-UI中el-input无法输入 - 因为组件嵌套太深，导致无法组件无法刷新   this.$forceUpdate()

  - 文字左右对齐 text-align: justify; white-space: normal;

  - 单行省略号    overflow: hidden;text-overflow:ellipsis;white-space: nowrap;

  - 多行省略号    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;

  - 抬头缩进      text-indent: 2em;

  - 块元素居中    display: grid;place-content: center;

  - 占位隐藏      visibility:hidden;
  
  - 元素缩小居左  transform: scale(0.8);transform-origin: left;
      
  - 奇偶数选择器  div:nth-child(odd) {}; div:nth-child(even) {}

  - 文字竖着排    -webkit-writing-mode: vertical-rl; // 文字竖排  writing-mode: vertical-rl;

  - IOS层级无效   z-index: 999;transform: translateZ(1000px);

  - IOS，帧动画 使用rotate() deg单位不显示；父元素添加以下代码
  
  ``` bash
    transform: perspective(1000);
  -moz-transform: perspective(1000);  
  -o-transform: perspective(1000);
  -webkit-transform: perspective(1000);
  ```

  - 字符串翻转      Str = name.split('').reverse().join(''); 
  
  - 数组排序        array.sort((a, b) => a.isFree - b.isFree)

  - input限制数字   oninput="value=value.replace(/[^\d]/g,'')"

  - 去除字符串的第一个字符    newStr = Str.slice(1)

  - 删除对象属性    delete obj.name
  
  -  vscode拓展插件 vscode-icons | volar | Markdown All in One | chinese(Simplified)
  
  -  使用export default时，对应的import语句不需要使用大括号；不使用export default时，对应的import语句需要使用大括号。
     export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。
     所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令

  - $refs常用方式
  ``` bash
    css     this.$refs.demo.style.left = 100 + 'px';
  class   this.$refs.demo.classList.add("className")  this.$refs.demo.classList.remove("className")
  ```


  - 滚动条宽度隐藏 overflow: overlay;   div::-webkit-scrollbar { display: none; }

  - 判断具名插槽是否存在 
  ``` bash
  <div class="footer" v-if="$slots.footer">
    <slot name="footer"></slot>
  </div>
  ``` 

  - vite无法使用require问题 
  ``` bash
    const getImageUrl = (name) => {
    return new URL(`./img/${name}`, import.meta.url).href
  }

  img.src = getImageUrl("snow.png");
  ``` 