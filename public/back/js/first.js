/**
 * Created by Jepson on 2018/8/19.
 */

$(function() {

  var currentPage = 1;
  var pageSize = 5;

  // 1. 一进入页面, 发送ajax请求, 请求一级分类数据, 进行页面渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template( "firstTpl", info );
        $('.lt_content tbody').html( htmlStr );

        // 分页插件初始化
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页, 重新渲染
            currentPage = page;
            render();
          }
        });
      }
    })
  }



});
