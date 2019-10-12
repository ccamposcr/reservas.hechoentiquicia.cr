<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_client_ctrl extends CI_Controller {

    private $name;
    private $lastname;
    private $email;
    private $phone;
    private $address;
    private $clientID;

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Api_client_model");
    }

    public function setClient(){

        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : '';
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : '';
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : '';
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : '';
        $address = ( isset($_POST['address']) ) ? strip_tags($_POST['address']) : '';
        $clientID = ( isset($_POST['clientID']) ) ? strip_tags($_POST['clientID']) : '';

        $this->Api_client_model->setClient($name, $lastname, $email, $phone, $address, $clientID);
    }

    public function getClientByID(){

        $id = ( isset($_POST['id']) ) ? strip_tags($_POST['id']) : 0;
        $client = $this->Api_client_model->getClientByID($id);

        echo json_encode($client);

    }

    public function getClientByClientID(){

        $clientID = ( isset($_POST['clientID']) ) ? strip_tags($_POST['clientID']) : 0;
        $client = $this->Api_client_model->getClientByClientID($clientID);

        echo json_encode($client);

    }

    public function getAllClients(){

        $clients = $this->Api_client_model->getAllClients();

        echo json_encode($clients);

    }
}