console.log("成功");
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola":"parabola",
        "nav":"nav",
        "slide":"slide",
        "goodsData":"goodsData"
    },
    shim:{
        "jquery-cookis":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})
require(["nav","slide","goodsData"],function(nav,slide,goodsData){
    nav.topNavDown();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.searchTab();
    nav.bannerDownload();
    nav.banner();
    slide.download();
    slide.slideTab();
    slide.countDown();
    goodsData.tabMenu();
    goodsData.download();
})