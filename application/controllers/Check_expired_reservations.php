<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Check_expired_reservations extends CI_Controller {
	 function __construct() {
        parent::__construct();
        $this->load->model('Check_expired_reservations_model');
    }

    function checkExpiredReservations() {
       $this->check_expired_reservations_model->checkExpiredReservations(); 
    }

    function deleteAllTmpReservationsEndDay(){
    	$this->check_expired_reservations_model->deleteAllTmpReservationsEndDay(); 
    }
}