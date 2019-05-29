<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class login_controller extends CI_Controller {
	 function __construct() {
        parent::__construct();
        $this->load->model('login_model','',true);
    }

    function index() {
        $headerOptions = simplexml_load_file("xml/header.xml");
        $this->load->view('includes/header', $headerOptions->internal);
        $this->load->view('login_view'); //load view for login
        
        $footerOptions = simplexml_load_file("xml/footer.xml");

        switch ( $this->uri->segment(1) ) {
            case 'complejo1':
                $footerOptions = $footerOptions->complejo1;
                break;
            
           case 'complejo2':
                $footerOptions = $footerOptions->complejo2;
                break;
        }

        $this->load->view('includes/internal_footer', $footerOptions);
    }

    function verify() {
        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_checkUser');
 
        if( !$this->form_validation->run() ) {
            $headerOptions = simplexml_load_file("xml/header.xml");
            $this->load->view('includes/header', $headerOptions->internal);
            $this->load->view('login_view');

            $footerOptions = simplexml_load_file("xml/footer.xml");

            switch ( $this->uri->segment(1) ) {
                case 'complejo1':
                    $footerOptions = $footerOptions->complejo1;
                    break;
                
               case 'complejo2':
                    $footerOptions = $footerOptions->complejo2;
                    break;
            }

            $this->load->view('includes/internal_footer', $footerOptions);
        }
        else{
            redirect($this->uri->segment(1) . '/1/admin');
        }       
     }

     function checkUser($password) {
        $user = $this->input->post('username');
        $userInfo = $this->login_model->login(strip_tags($user), strip_tags($password));
        $result = false;
        if( $userInfo ) {
            $sess_array = array('id' => $userInfo[0]->id, 'user' => $userInfo[0]->user, 'rol' => $userInfo[0]->rol, 'groupManager' => $userInfo[0]->id_group, 'name' => $userInfo[0]->name);
	        $this->session->set_userdata('logged_in', $sess_array);
         	$result = true;
        }
        else {
          	$this->form_validation->set_message('checkUser', 'Invalid username or password');
          	$result = false;
        }

        return $result;
      }

      function changePassword(){
        $user = ( isset($_POST['user']) ) ? strip_tags($_POST['user']) : '';
        $password = ( isset($_POST['password']) ) ? strip_tags($_POST['password']) : '';
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : '';
        $this->login_model->changePassword($user,$password,$name);
      }
}
/* End of file login_view.php */
/* Location: ./application/controllers/login_view.php */