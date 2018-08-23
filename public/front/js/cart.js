/**
 * Created by Jepson on 2018/8/23.
 */

$(function() {

  function render() {
    // 1. 一进入页面, 发送 ajax 请求, 获取购物车数据
    //   (1) 用户未登录, 后台返回 error 拦截到登录页
    //   (2) 用户已登录, 后台返回 购物车数据, 进行页面渲染
    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
        success: function( info ) {
          console.log( info )
          if ( info.error === 400 ) {
            // 未登录
            location.href = "login.html";
            return;
          }

          // 已登录, 可以拿到数据, 通过模板渲染
          // 注意: 拿到的是数组, template方法参数2要求是一个对象, 需要包装
          var htmlStr = template("cartTpl", { arr: info } );
          $('.lt_main .mui-table-view').html( htmlStr );

          // 渲染完成, 需要关闭下拉刷新
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        }
      });
    }, 500);
  }


  // 2. 配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper", // 下拉刷新容器标识
      down : {
        auto: true, // 一进入页面就下拉刷新一次
        callback: function() {
          console.log( "下拉刷新了" );
          // 发送 ajax 请求, 获取数据, 进行渲染
          render();
        }
      }
    }
  });



  // 3. 删除功能
  // (1) 给删除按钮注册事件, 事件委托, 通过 tap进行注册点击
  // (2) 获取在按钮中存储的 id
  // (3) 发送 ajax 请求, 执行删除操作
  // (4) 页面重新渲染
  $('.lt_main').on("tap", ".btn_del", function() {
    var id = $(this).data("id");
    // 发送请求
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      // 后台要求传的 id 参数是一个数组格式
      data: {
        id: [ id ]
      },
      dataType:"json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 删除成功
          // 调用一次下拉刷新
          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        }
      }
    })
  })

})