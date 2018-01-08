$(document).ready(function (){
    //左边点击导航变色
    $('.secOul li').on('click',function () {
        $(this).addClass('change-svg').siblings().removeClass('change-svg');
    });
//点击中间导航下拉换向 隐藏的ol显示
    $('.secOulTwo li').on('click',function () {
        $(this).toggleClass('nav-change').siblings().removeClass('nav-change');
        $(this).children('.navOul').toggleClass('showEle').parents(this).siblings().children('.navOul').removeClass('showEle');
    });
//点击中间导航下拉换向 li中的字体变色
    $('.navOul li').click(function () {
        event.stopPropagation();
        $(this).addClass('changes-clo').siblings().removeClass('changes-clo');
    });
//点击左边导航 li背景变色
    $('.rightNav li:not(".disable")').on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.contentCenter>div:not(".list-content")').hide();
//右边主体点击导航变色
    $('.contentTitle>ul>li').on('click',function () {
        $(this).addClass('liSty').siblings().removeClass('liSty');
        var listTitle = $(this).attr("data-title");
        $(this).parents('section').find('.'+listTitle).show().siblings().hide();
    });
    /*点击勾选*/
    $(".checked-none").each(function(i){
        $(this).attr({"id":"checked"+i});
        $(this).next("label").attr("for","checked"+i);
    });
});

