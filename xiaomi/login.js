define(["jquery"],function($){
    function loginSend(){
        // var oBtn = document.getElementById("submit-btn");
        $("#submit-btn").click(function(){
            $.ajax({
                type:"post",
                url:"./php/login.php",
                data:{
                    username:$(".input-one").val(),
                    password:$(".input-two").val()
                },
                success:function(result){
                    var obj = JSON.parse(result);
                        if(obj.code){
                           $("#alert_info").attr("class","alert alert-danger");
                        }else{
                            $("#alert_info").attr("class","alert alert-success");
                            location.href = "http://localhost:2222";
                        }
                        $("#alert_info").css("display","block");
                        $("#alert_info").html(obj.message);
                    
                    
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return{
       loginSend:loginSend
    }
})