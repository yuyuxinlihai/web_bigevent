$(function () {
  $("#link_reg").on("click", function () {
    $(".regiter-box").show();
    $(".login-box").hide();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".regiter-box").hide();
  });
  // 登录密码验证
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".regiter-box [name='password']").val();
      if (value != pwd) return "两次密码不一致";
    },
  });

  //监听注册
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var username = $(".regiter-box [name='username']").val();
    var password = $(".regiter-box [name='password']").val();
    $.post(
      "/api/reguser",
      { username: username, password: password },
      function (data) {
        if (data.status != 0) {
          return layer.msg(data.message);
        }
        layer.msg(data.message);
        $("#link_login").click();
      }
    );
  });
  //监听登陆
  $("#form_login").submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: data,
      success: function (response) {
          if(response.status=='0')
          {
            layer.msg(response.message);
            localStorage.setItem("token",response.token);
            location.href = '/index.html'
          }
          else
          {
            layer.msg(response.message);
          }
      },
    });
  });
});
