var stars = document.getElementById("stars");
// js随机生成流星
for (var j = 0; j < 15; j++) {
  var newStar = document.createElement("div");
  newStar.className = "star";
  newStar.style.top = randomDistance(100, -100) + "px";
  newStar.style.left = randomDistance(2000, 1000) + "px";
  stars.appendChild(newStar);
}
// 封装随机数方法
function randomDistance(max, min) {
  var distance = Math.floor(Math.random() * (max - min + 1) + min);
  return distance;
}
var star = document.getElementsByClassName("star");
// 给流星添加动画延时
for (var i = 0, len = star.length; i < len; i++) {
  star[i].style.animationDelay = i % 6 == 0 ? "0s" : i * 0.8 + "s";
}

$('.login').click(function () {
  var query = {
    username: $('input[name="username"]').val(),
    password: $('input[name="password"]').val()
  }
  $.post(window.location.href + 'users/login', query, function (res) {
    console.log(res);
    if (res.status === '200') {
      console.log('登录成功');
      window.location.href = window.location.href + 'home'
    } else {
      alert('账号或者密码错误')
    }
  })
})
$('.register').click(function () {
  console.log('zcc');
  var query = {
    username: $('input[name="username"]').val(),
    password: $('input[name="password"]').val()
  }
  $.post(window.location.href + 'users/add', query, function (res) {
    console.log(res);
    if (res.status === '200') {
      alert('注册成功');
    } else {
      alert(res.data)
    }
  })
})