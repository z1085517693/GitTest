

define(["jquery"],function($){
    //顶部导航栏
    
    function topNavDown(){
  
        $.ajax({
            url:"../data/nav.json",
            success: function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title: "服务"}, {title: "社区"});
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="" class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                </li>`).appendTo(".site-Bar .header-nav .nav-list");
                var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                </ul>`);
                node.appendTo(".J_navMenu .container");
                if(topNavArr[i].childs){
                    var childsArr = topNavArr[i].childs;
                    for(var j = 0; j < childsArr.length;j++){
                        $(`<li>
                        <a href="#">
                            <div class = 'figure figure-thumb'>
                                <img src="${childsArr[j].img}" alt=""/>
                            </div>
                            <div class = 'title'>${childsArr[j].a}</div>
                            <p class = 'price'>${childsArr[j].i}</p>
                        </a>
                    </li>`).appendTo(node);
                    }
                }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    
    //顶部导航添加移入移出效果
    function topNavTab(){
        
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            if(index >= 0 && index <= 6){
                $(".J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $(".J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
            }
        })
        $(".site-Bar").on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
        })


        //移出的时候取消下拉菜单
        $(".J_navMenu").mouseleave(function(){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
        })
        
    }
    //侧边导航栏
    function leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success: function(result){
                var sideArr = result.sideNav;
                // alert(sideArr);
                for(var i = 0; i < sideArr.length; i++){
                    var node =$(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                       ${sideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix children-col-4" >
                
                    </div>
                </li>`);
                node.appendTo(".site-cate-list");
                //取出当前选项对应的节点
                var childsArr = sideArr[i].child;
                //一共多少列
                var col = Math.ceil(childsArr.length / 6);
                //计算一共多少列，设置对应的class样式
                node.find("div.children").addClass("children-col-"+ col);
                //通过循环，创建右侧上面的每一个数据
                for(var j = 0;j < childsArr.length; j++){
                    if(j % 6 == 0){
                        var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j/6)}">
                    </ul>`);
                    newUl.appendTo(node.find(".children"));
                    }
                    $(` <li>
                    <a href="http://www.mi.com/redminote8pro"  class="link clearfix">
                        <img src="${childsArr[j].img}" width="40" height="40" alt="" class="thumb">
                        <span class="text">${childsArr[j].title}</span>
                    </a>
                </li>`).appendTo(newUl);
                }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    //banner图
    function bannerDownload(){
        $.ajax({
            url:"data/nav.json",
            success:function(result){
                var bannerArr = result.banner;
                // alert(bannerArr);
                for(var i = 0; i < bannerArr.length; i++){
                    $(` <a href="" style="opacity: 0.2;"><img src="../images/banner/${bannerArr[i].img}" alt=""></a>`)
                    .appendTo("#J_homeSwiper .swiper-slide");
                    var node = $(`<a href="" class="swiper-pagination-bullet" style="margin:0 4px"></a>`);
                    if(i == 0){
                        node.addClass('swiper-pagination-bullet-active');
                    }
                    node.appendTo('#J_homeSwiper .swiper-pagination');
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    //给侧边导航栏添加移入切换效果， 选项卡的切换效果
    function leftNavTab(){
        //通过事件委托
        // $(".site-cate-list").on("mouseenter","category-item",function(){
        //     // $(this).addClass("category-item-active");
        //    $(this).find("div.children").css('display','block');
        // })
        // $(".site-cate-list").on("mouseleave","category-item",function(){
        //     $(this).removeClass("category-item-active");
        // })
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", ".category-item", function(){
            $(this).removeClass("category-item-active");
        })
    }
      //搜索框效果
      function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        })
        $("#search").blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })}
        //banner图效果
    function banner(){
       
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;
        var timer = setInterval(function(){
            iNow++;
            tab();

        }, 2500);

        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow == 5){
                iNow = 0;
            }

            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
            //对应的小圆圈指定当前是哪张图片显示
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        });
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
    
            }, 3000);
        });

        $("#J_homeSwiper .swiper-pagination").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false;
        })

        //给上一张和下一张添加点击事件
        $(".swiper-button-prev,.swiper-button-next").on("click", function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow == 0){
                    iNow == 4;
                }
            }else{
                iNow++;
            }
            tab();
        })

    }
    
    return {
        searchTab:searchTab,
        topNavDown:topNavDown,
        topNavTab:topNavTab,
        leftNavDownload:leftNavDownload,
        leftNavTab:leftNavTab,
        bannerDownload:bannerDownload,
        banner:banner
    }
})