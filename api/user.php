<?php
include_once 'database/db_connect.php';
include_once 'helper.php';
class User{
    private $is_vaild;
    public $information;
    public function __construct($id) {
        $this->information = get_tb_col_value("users","id",$id);
        if($this->information ==NULL){
            $this->is_vaild = false;
        }else{
            $this->is_vaild = true;
        }
    }
    /*
        return userinfomation as json string
    */
    public function info(){
        if(!$this->is_vaild){
            return;
        }
        $_info = $this->information;
        $info = ['username' =>$_info['username'],
                'email'=>$_info['email'],
                "phone_number"=>$_info["phone_number"],
                "bg_image"=>$_info['bg_image'],
                "pf_image"=>$_info['icon_image']
            ];
        echo json_encode($info);
    }
    public function my_items(){
        if(!$this->is_vaild){
            return;
        }
        $user_id = $this->information['id'];
        $sql = "SELECT * FROM items WHERE user_id = $user_id and item_state = 'active'";
        // $result = get_tb_col_value("items","user_id",$user_id,true);
        $result=get($sql,array(),true);
        echo json_encode($result);
    }
    public function items(){
        if(!$this->is_vaild){
            return;
        }
        $user_id = $this->information['id'];
        $sql = "SELECT * FROM items";
        $result = get($sql,array(),true);
        echo json_encode($result);
    }
    // user class save the item to database;
    public function post_item($json){
        if(!$this->is_vaild){
            return;
        }
        $tb = 'items';
        $col = '(
                `user_id`,
                `date_posted`,
                `item_state`,
                `last_modify`,
                `item_name`,
                `item_image_dir`,
                `item_description`,
                `item_price`,
                `item_contact`)';
        // dummy
        $json_obj = json_decode($json,true);
        print_r($json_obj);
        $filename = '/path/to/image.jpg';
        $path_parts = pathinfo( $filename );
        // $image_name = sql_dots('/uploads/items/'.randomStr(20).'.'.$path_parts['extension']);
        $image_name = $json_obj['item_image'];
        $item_description = $json_obj['description'];
        $item_price = $json_obj['price'];
        $seller = $json_obj['contact'];
        $date_posted = date("Y-m-d H:i:s");
        $item_name = $json_obj['item_name'];
        $poster_id = $this->information['id'];
        $item_state = 'active';
        $val = array($poster_id, $date_posted, $item_state , $date_posted, $item_name, $image_name, $item_description, $item_price, $seller);
        $sql = "INSERT INTO items $col VALUES (?" . str_repeat(',?',count($val)-1) . ")";
        get($sql,$val);
        // insert_tb_cols_values($tb,$col,$val);
    }
    public function is_auth(){
        return $this->is_vaild;
    }
    // TODO: user sent request to update his profile
    public function change_profile($json_obj){
        if(!$this->is_vaild){
            return;
        }
        $new_username = $json_obj['username'];
        $new_email = $json_obj['email'];
        $new_phone = $json_obj['phoneNumber'];
        if(check_tb_col_value_exist("users","username",$new_username) && $this->information['username'] != $new_username){
            header('HTTP/1.0 403 Forbidden');
            die();
        }
        $_id = $this->information['id'];
        $sql = "UPDATE users SET username = ?, email = ?, phone_number = ? WHERE id = $_id";
        get($sql,array($new_username,$new_email,$new_phone));
    }
    public function add_comment($item_id,$comment){
        if(!$this->is_vaild){
            return;
        }
        $_id = $this->information['id'];
        $sql = "INSERT INTO `item_comments`(`user_id`, `item_id`, `comment_text`, `time_created`) VALUES (?,?,?,?)";
        get($sql,array($_id,$item_id,$comment,date("Y-m-d H:i:s")));
    }

    public function change_pf_image($img_name){
        if(!$this->is_vaild){
            return;
        }
        $old_bg_image = $this->information['icon_image'];
        if(unlink('../'.$old_bg_image)){
                echo "../".$old_bg_image." removed";
        }
        $_id = $this->information['id'];
        $sql = "UPDATE users SET icon_image = ? WHERE id = ?";
        get($sql,array($img_name,$_id));
    }
    public function change_bg_image($img_name){
        if(!$this->is_vaild){
            return;
        }
        $old_bg_image = $this->information['bg_image'];
        if(unlink('../'.$old_bg_image)){
                echo "../".$old_bg_image." removed";
        }
        $_id = $this->information['id'];
        $sql = "UPDATE users SET bg_image = ? WHERE id = ?";
        get($sql,array($img_name,$_id));
    }
    // save the views in view history
    public function view_items($item_id){
        if(!$this->is_vaild){
            return;
        }

        $user_id = $this->information['id'];
        $col = '(`user_id`, `item_id`, `time_created`)';
        $time_created = date("Y-m-d H:i:s");
        $condition = "user_id = '$user_id' AND item_id = '$item_id'";
        $sql = "SELECT * FROM view_history WHERE user_id = ? AND item_id = ?";
        if(check_tb_condition_exist($sql,array($user_id,$item_id))){
            $sql = "UPDATE view_history SET time_created = ? WHERE user_id = ? AND item_id = ?";
            get($sql,array($time_created,$user_id,$item_id));
            // update_tb_col_value_where("view_history","time_created",sql_dots($time_created),$condition);
        }else{
            // $val = "('$user_id','$item_id','$time_created')";
            $sql = "INSERT INTO view_history $col VALUES (?,?,?)";
            get($sql,array($user_id,$item_id,$time_created));
        }

    }
    // join two table items and view_history to get user's history
    public function view_history(){
        if(!$this->is_vaild){
            return;
        }
        $user_id = $this->information['id'];
        $args = array($user_id);
        $sql = "SELECT i.item_name, i.item_price, i.item_image_dir, i.item_id, v.time_created
        FROM view_history v, items i
        WHERE v.user_id  = ? and v.item_id = i.item_id and i.item_state = 'active'
        ORDER BY v.time_created DESC;";
        $views = get($sql,$args,true);
        echo json_encode($views);
    }
}

?>