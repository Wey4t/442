<?php
include_once '../database/db_connect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
$entityBody = file_get_contents('php://input');
switch($method){
    case "POST":
        if(empty($_POST)){
            $dump = json_decode($entityBody, true);
            if($dump['username'] == "" || $dump['password'] == ""){
                die("one of you information is empty");
            }
            if (check_user_password($dump['username'],$dump['password'])){
                $data = get_by_username($dump['username']);
                $uid = randomStr(80);
                saveuid($uid,$data['id']);
                setcookie('uid', $uid, [
                    'expires' => time() + 86400,
                    'path' => '/',
                    'secure' => true,
                    'httponly' => true,
                    'samesite' => 'None',
                ]);

                echo "success";
            }else{
                echo "fail";
            }
        }else{

        }

        break;
    default:
        echo " you should use POST";
}