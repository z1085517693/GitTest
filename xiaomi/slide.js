define(["jquery"],function($){
    function download(){
        $.ajax({
            url:"../data/slide.json",
            success:function(result){
                var slideArr = result.data.list.list;
                for(var i =0;i < slideArr.length; i++){
                    $(`<li> 
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideArr[i].pc_img}" alt=""/>
                            </div>
                            <div class="content-b">
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}</del>
                                </p>
                            </div>
                        </div>
                    </a>
                </li>`).appendTo(".home-one .box-right .box-right-one");
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function slideTab(){
        var aSpans = $(".dog-content .btn").find('span');
        var iNow = 0; // 代表第几组图片
        var iCount = Math.ceil(26 / 4) -1;
        var timer = setInterval(function(){
            iNow++;
            tab();
            if(iNow == iCount){
                clearInterval(timer);
            }
        },6000);
        function tab(){
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass('swiper-button-disabled');
            iNow == iCount ? aSpans.eq(1).addClass('swiper-button-disabled') : aSpans.eq(1).removeClass('swiper-button-disabled');
            //计算运动的目的值
            // if(iNow == iCount){
            //     iNow = 0;
            // }
            var iTarget = iNow == iCount ? iNow * -992 + 496 : iNow * -992;
            $(".home-one .box-right ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "4000ms"
            })
        }
        aSpans.click(function(){
            if($(this).index() == 0){
                //左键
                iNow--;
                iNow = Math.max(0,iNow);
            }else{
                iNow++;
                iNow = Math.min(iCount,iNow);
            }
            tab();
        })
        // $(".btn span").mouseenter(function(){
        //     clearInterval(timer);
        // }).mouseleave(function(){
        //     var timer = setInterval(function(){
        //         iNow++;
        //         tab();
        //         if(iNow == iCount){
        //             clearInterval(timer);
        //         }
        //     },4000);
        // })
    }
    //定时器倒计时，每天14:00开枪，每天22:00开枪
    function countDown(){
        var nowDate = new Date();
        var hour = nowDate.getHours();
        var date = nowDate.getDate();
        var afterDate = new Date();
       
        
        //计算倒计时时间间隔
        if(hour < 14){
            afterDate.setHours(14);
            $(".box-one .round").html("14:00 场");
            
        }else if(hour >= 14 && hour < 22){
            afterDate.setHours(22);
            $(".box-one .round").html("22:00 场");
        }else{
            $(".box-one .round").html("明日14:00 场");
            afterDate.setHours(14);
            afterDate.setDate(date + 1);
        }
        afterDate.setMilliseconds(0);
        afterDate.setSeconds(0);
        afterDate.setUTCMilliseconds(0);

        //计算倒计时总秒数
        var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);
    

        var aSpans = $(".box-bd .countdown").find("span");
        
        var timer = setInterval(function(){
            count--;
            aSpans.eq(2).html(doubleNum(count % 60));
            aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
            aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
            if(count == 0){
                clearInterval(timer);
                $(".box-bd .desc").html("本次活动结束,敬请期待~");
            }
        }, 1000);
    }

    function doubleNum(num){
        if(num < 10){
            return "0" + num;
        }else{
            return num;
        }
    }
    return{
        download:download,
        slideTab:slideTab,
        countDown:countDown
    }
})