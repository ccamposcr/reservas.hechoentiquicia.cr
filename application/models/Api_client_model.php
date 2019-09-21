<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_client_model extends CI_MODEL
{
    
    function setClient($id, $name, $lastname, $email, $phone, $address){ 
        $this->db->query("INSERT INTO client(id, name, lastname, email, phone, address)". 
        "VALUES (".$this->db->escape($id).
        ",".$this->db->escape($name).
        ",".$this->db->escape($lastname).
        ",".$this->db->escape($email).
        ",".$this->db->escape($phone).
        ",".$this->db->escape($address).")");
    }

    function getClientByID($id){
    	$query = $this->db->query("SELECT * FROM client WHERE id = ".$this->db->escape($id));
        return $query->result_array();
    }

    function getAllClients(){
    	$query = $this->db->query("SELECT * FROM client");
        return $query->result_array();
    }
}

