<?php
include_once 'user.php';
$method = $_SERVER['REQUEST_METHOD'];
print_r($_FILES);
if ($method == 'POST'){
    if(isset($_COOKIE['uid'])){
        $uid = $_COOKIE['uid'];
        $infor = get_tb_col_value("cookies","uid",$uid);
        if(!$infor){
            header('HTTP/1.0 401 Unauthorized');
            die();
        }
        //TODO need to filter error type file, such as mp4, gif....
        if($_FILES["bg"]["error"] == UPLOAD_ERR_OK){
            $uploads_dir = '../uploads';
            $tmp_name = $_FILES["bg"]["tmp_name"];
            $name = randomStr(20).'.png';
            $a = new User($infor['id']);
            $a->change_bg_image(sql_dots("uploads/$name")); // need to parese argument late
            move_uploaded_file($tmp_name, "$uploads_dir/$name"); // save in disk after insert record to database
        }
        die();
    }else{
        header('HTTP/1.0 401 Unauthorized');
        die();
    }
}
header('HTTP/1.0 405 Method Not Allowed');
?>