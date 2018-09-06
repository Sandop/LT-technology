/*新闻资讯部分*/
(function(){
	tabdiv(".news-list-nav li",".news-list-tab-content .news-list-tab-box","click",500);
})();
/*新闻资讯部分结束*/

/*公共函数部分*/

//页签切换
function tabdiv(tab,div,event,speed){
    speed=isNaN(speed)?0:speed;
    $(div).each(function(index, element) {
        $(this).attr("idx",index);
    });
    $(tab).each(function(index, element) {
        $(this).bind(event,function(){
            $(tab).removeClass("active");
            $(this).addClass("active");
            $(div+"[idx='"+index+"']").fadeIn(speed);
            $(div+"[idx!='"+index+"']").hide();
        });
    });
}
/*公共函数部分结束*/