
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
  
class Login_model extends CI_MODEL {
 
    function __construct() {
        parent::__construct();
    }
 
    function login($user, $password) {
        //create query to connect user login database
        $password =  MD5($password);
        $query = $this->db->query("SELECT * FROM t_admin WHERE user = ".$this->db->escape($user)." AND password = ".$this->db->escape($password));
        $result = false;

        if($query->num_rows() == 1) { 
            $result =  $query->result(); //if data is true
        }

        return $result;
    }

    function changePassword($user,$password,$name){
        $password =  MD5($password);
        $this->db->query("UPDATE t_admin SET password=".$this->db->escape($password).",name=".$this->db->escape($name)."WHERE user = ".$this->db->escape($user));
    }
}
  
/* End of file Login_model.php */
/* Location: ./application/models/Login_model.php */