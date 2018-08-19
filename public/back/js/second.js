/**
 * Created by Jepson on 2018/8/19.
 */


$(function() {


  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数

  // 1. 一进入页面, 发送 ajax 请求进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
         console.log( info );
        // 在模板中可以任意使用数据对象里面的所有属性
        var htmlStr = template( "secondTpl", info );
        $('.lt_content tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加按钮点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })

  }


})