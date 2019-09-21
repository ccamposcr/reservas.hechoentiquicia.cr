<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_client_ctrl extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Api_client_model");
    }

    public function setClient(){

        $id = ( isset($_POST['id']) ) ? strip_tags($_POST['id']) : '0';
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : '';
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : '';
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : '';
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : '';
        $address = ( isset($_POST['address']) ) ? strip_tags($_POST['address']) : '';

        $this->Api_client_model->setClient($id, $name, $lastname, $email, $phone, $address);
    }

    public function getClientByID(){

        $id = ( isset($_POST['id']) ) ? strip_tags($_POST['id']) : 0;
        $client = $this->Api_client_model->getClientByID($id);
        echo json_encode($client);

    }

    public function getAllClients(){

        $clients = $this->Api_client_model->getAllClients();
        echo json_encode($clients);

    }
}