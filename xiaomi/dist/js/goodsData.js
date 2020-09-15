console.log("2");
define(["jquery"],function($){
    function download(){
        $.ajax({
            url:"../data/data.json",
            success:function(arr){
                var firstData = arr[0];
                var node = $(`<div class = 'home-banner-box'>
                <a href="#">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
                </a>
            </div>
            <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                <div class = 'box-hd'>
                    <h2 class = 'title'>${firstData.title}</h2>
                    <div class = "more">
                        <a href="#" class = 'more-link'>
                            查看全部
                            <i class = 'iconfont iconfont-arrow-right-big'></i>
                        </a>
                    </div>
                </div>
                <div class = 'hox-bd clearfix'>
                    <div class = 'row'>
                        <div class = 'span4'>
                            <ul class = 'brick-promo-list clearfix'>
                                <li class = 'brick-item brick-item-l'>
                                    <a href="#">
                                        <img src="${firstData.img}" alt=""/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class = 'span16'>
                            <ul class = 'brick-list clearfix'>
                                
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`);
                node.appendTo(".dog-content .content");

                //通过循环将子元素进行创建
                for(var i = 0; i < firstData.childs.length; i++){
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="160" height="160" src="${firstData.childs[i].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>
                                ${firstData.childs[i].title}
                            </h3>
                            <p class = 'desc'>${firstData.childs[i].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${firstData.childs[i].price}</span>
                                元
                                <span>起</span>
                                ${firstData.childs[i].del == 0 ? "" : "<del>" + firstData.childs[i].del + "元<del>"}
                            </p>
                        </a>
                    </li>`).appendTo(node.find(".hox-bd .span16 ul"));
                }


               
                //后续部分数据加载
                for(var i = 1; i < arr.length; i++){
                    var node2 = $(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${arr[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'title'>${arr[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class = 'tab-active'>
                                        热门
                                    </li>
                                    <li>
                                        ${arr[i].subTitle}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${arr[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${arr[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <div>
                                        <ul class = 'brick-list clearfix'>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul class = 'brick-list clearfix hide'>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    node2.appendTo(".dog-content .content");

                    var hotChilds = arr[i].hotChilds;
                    for(var k = 0; k < hotChilds.length; k++){
                        $(`<div>
                            <li class = 'brick-item ${k == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${hotChilds[k].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${hotChilds[k].title}</h3>
                                    <p class = 'desc'>${hotChilds[k].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${hotChilds[k].price}</span>元
                                        ${hotChilds[k].del == 0 ? "" : "<del><span class = 'num'>" + hotChilds[k].del + "</span>元</del>"}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node2.find(".span16 .brick-list").eq(0));
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                            <a href="#">
                                <div class = 'figure figure-more'>
                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                </div>
                                <div class = 'more'>
                                    浏览更多
                                    <small>热门</small>
                                </div>
                            </a>
                        </li>`).appendTo(node2.find(".span16 .brick-list").eq(0));

                    var childs = arr[i].childs;
                    
                    
                    for(var l = 0; l < childs.length; l++){
                        
                        $(`<div>
                            <li class = 'brick-item ${l == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${childs[l].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${childs[l].title}</h3>
                                    <p class = 'desc'>${childs[l].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${childs[l].price}</span>元
                                        ${childs[l].del == 0 ? "" : "<del><span class = 'num'>" + childs[l].del + "</span>元</del>"}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node2.find(".span16 .brick-list").eq(1));
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                        <a href="#">
                            <div class = 'figure figure-more'>
                                <i class = 'iconfont iconfont-circle-arrow-right'></i>
                            </div>
                            <div class = 'more'>
                                浏览更多
                                <small>${arr[i].subTitle}</small>
                            </div>
                        </a>
                    </li>`).appendTo(node2.find(".span16 .brick-list").eq(1));
                }
                // var arr=[];
            //     var firstData = arr[0];
                
            //     var node=$(` <div class="home-pic">
            //     <a href="">
            //         <img src="../images/xmad_15625126063988_sCIBm.jpg" alt="">
            //     </a>
            // </div>
            //     <div class="home-all clearfn">
            //         <div class="box-hd clearfn">
            //             <h2 class="title">${firstData.title}</h2>
            //             <div class="btn">
            //                 <a href="">查看全部
            //                     <i class="iconfont iconfont-arrow-right-big"></i>
            //                 </a>
            //             </div>
            //         </div>
            //         <div class="box-content">
            //             <div class="content-left">
            //                 <a href="">
            //                 <img src="${firstData.img}" alt=""></a>
            //             </div>
            //             <div class="content-goods">
            //                 <div class="box-ul">
            //                     <ul class="box-right-one">
                                
            //                     </ul>
            //                 </div>
            //             </div>                           
            //         </div>
               
            // </div>`);
            //     node.appendTo(".dog-content .content");
            //     // alert(firstData.childs);
            //     for(var i = 0 ; i < firstData.childs.length ; i++ ){
            //                 $(`<div>
            //                 <li> 
            //                 <a href="#" target = "_blank">
            //                 <div class = 'content'>
            //                         <div class = 'thumb'>
            //                         <img width="160" height="160" src="${firstData.childs[i].img}" alt=""/>
            //                     </div>
            //                     <div class="content-b">
            //                         <h3 class = 'title'>${firstData.childs[i].title}</h3>
            //                         <p class = 'desc'>${firstData.childs[i].desc}</p>
            //                         <p class = 'price'>
            //                             <span>${firstData.childs[i].price}</span>元
            //                             ${firstData.childs[i].del == 0 ? "" : "<del>" + firstData.childs[i].del + "元<del>"}
            //                         </p>
            //                     </div>
            //                 </div>
            //             </a>
            //         </li></div>`).appendTo(".home-all .box-content  .content-goods ul");
            //     }
            //     //后续数据加载
            //         var secData = arr[1];
            //         var node2 = $(` 
            //     <div class="home-all">
            //             <div class="box-hd">
            //                 <h2 class="title">${secData.title}</h2>
            //                 <div class="more">
            //                     <ul class="tab-list">
            //                         <li class="tab-active">热门</li>
            //                         <li>${secData.subTitle}</li>
            //                     </ul>
            //                 </div>
            //             </div>
            //             <div class="box-content">
            //                 <div class="content-left">
            //                     <ul class="contents">
            //                         <li class="contents-l">
            //                             <a href="">
            //                                 <img src="${secData.leftChilds[0]}" alt="">
            //                             </a>
            //                         </li>
            //                         <li>
            //                             <a href="">
            //                                 <img src="${secData.leftChilds[1]}" alt="">
            //                             </a>
            //                         </li>
            //                     </ul>
            //                 </div>
            //                 <div class="content-goods">
            //                     <div>
            //                         <ul class="box-right-one">
                                   
            //                         </ul>
            //                     </div>
                                
                                
            //                 </div>                           
            //             </div>
            //         </div>
            //     </div>`);
            //     node2.appendTo(".dog-content .content");
            //     var hotChilds = secData.hotChilds;
            //     for(var k = 0 ; k < hotChilds.length ; k++ ){
            //         $(`<li> 
            //         <a href="#" target = "_blank">
            //            <div class = 'content'>
            //                 <div class = 'thumb'>
            //                    <img width="160" height="160" src="${hotChilds[k].img}" alt=""/>
            //                </div>
            //                <div class="content-b">
            //                    <h3 class = 'title'>${hotChilds[k].title}</h3>
            //                    <p class = 'desc'>${hotChilds[k].desc}</p>
            //                    <p class = 'price'>
            //                        <span>${hotChilds[k].price}</span>元
            //                        ${hotChilds[k].del == 0 ? "" : "<del><span class = 'num'>" + hotChilds[k].del + "</span>元</del>"}
            //                    </p>
            //                </div>
            //            </div>
            //        </a>
            //    </li>`).appendTo(".box-content .content-goods ul").eq(0);
                
            //     }
            }
        })
    }

























    function tabMenu(){
        $(".container .dog-content").on("mouseenter",".more ul li",function(){
            $(this).addClass("tab-active").siblings("li").removeClass("tab-active");
            $(this).closest(".home-brick-box").find(" .box-bd .span16 div ul").addClass("hide").eq($(this).index()).removeClass("hide");
            console.log($(this).index());
        })
    }
    return{
        download:download,
        tabMenu:tabMenu
    }
})