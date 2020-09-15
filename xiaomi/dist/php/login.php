<?php
    header("Content-style:text/html;charset:utf-8");
    $responseData = array("code" => 0, "message" => "");
    $username = $_POST["username"];
    $password = $_POST["password"];
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    $link = mysqli_connect("localhost","root","123456");
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "数据库链接失败";
        echo json_encode($responseData);
        exit;
    }
    mysqli_set_charset($link,"utf8");
    mysqli_select_db($link,"rigister");
    $str = md5(md5(md5($password)."xxx")."yyy");
    //登录
    $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";
    $res = mysqli_query($link,$sql);
    $row = mysqli_fetch_array($res);
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误";
        echo json_encode($responseData);
    }else{
        $responseData["message"] = "登录成功";
        echo json_encode($responseData);
    }
    mysqli_close($link);
?>