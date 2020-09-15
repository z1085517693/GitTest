<?php
    header("Content-type:text/html;charset:utf-8");
    //统一发送回格式
    $responseData = array("code" => 0, "message" => "");
    //取出传过来的数据
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
    //连接数据库
    $link = mysqli_connect("localhost","root","123456");
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "数据库链接失败";
        echo json_encode($responseData);
        exit;
    }
    //设置字符集
    mysqli_set_charset($link,"utf8");
    // //选择数据库
    mysqli_select_db($link,"rigister");
    // //准备sql,验证用户名是否重名
    $sql = "SELECT * FROM users WHERE username ='{$username}'" ;
    // //发送sql语句
    $res = mysqli_query($link,$sql);
    // //取出返回的sql的一行数据
    $row = mysqli_fetch_array($res);
    if($row){
        //与这条数据，用户名重名
        $responseData["code"] = 4;
        $responseData["message"] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }
    // //准备sql语句，将数据插入到数据库中
    $str = md5(md5(md5($password)."xxx")."yyy");
    $sql1 = "INSERT INTO users(username,password) VALUES('{$username}','{$str}')";
    //返回布尔值，判断插入成功
    $res = mysqli_query($link,$sql1);
    if(!$res){
        $responseData["code"] = 5;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
    }else{
        $responseData["code"] = 0;
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }
    // if ($res) {
    //     echo "新记录插入成功";
    // } else {
    //     echo "Error: " . $res . "<br>" . mysqli_error($link);
    // }
    mysqli_close($link);
?>