<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Checkexpiredreservations extends CI_Controller {
	 function __construct() {
        parent::__construct();
        $this->load->model('checkexpiredreservationsm');
    }

    function checkExpiredReservations() {
       $this->check_expired_reservations_model->checkExpiredReservations(); 
    }

    function deleteAllTmpReservationsEndDay(){
    	$this->check_expired_reservations_model->deleteAllTmpReservationsEndDay(); 
    }
}