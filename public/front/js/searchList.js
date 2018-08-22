/**
 * Created by Jepson on 2018/8/22.
 */

$(function() {

  // 功能1: 获取地址栏传递过来的搜索关键字, 设置给 input
  var key = getSearch("key");
  // 设置给 input
  $('.search_input').val( key );
  // 一进入页面, 渲染一次
  render();


  // 根据搜索关键字, 发送请求, 进行页面渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: {
        proName: $('.search_input').val(),
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $('.lt_product').html( htmlStr );
      }
    });
  }


  // 功能2: 点击搜索按钮, 实现搜索功能
  $('.search_btn').click(function() {

    // 需要将搜索关键字, 追加存储到本地存储中
    var key = $('.search_input').val();
    if ( key.trim() === "" ) {
      alert("请输入搜索关键字");
      return;
    }
    render();

    // 获取数组, 需要将 jsonStr => arr
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse( history );

    // 1. 删除重复的项
    var index = arr.indexOf( key );
    if ( index != -1 ) {
      // 删除重复的项
      arr.splice(index, 1);
    }
    // 2. 长度限制在 10
    if ( arr.length >= 10 ) {
      // 删除最后一项
      arr.pop();
    }

    // 将关键字追加到 arr 最前面
    arr.unshift( key );
    // 转成 json, 存到本地存储中
    localStorage.setItem("search_list", JSON.stringify( arr ) );
  });




});