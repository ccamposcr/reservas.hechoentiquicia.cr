<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_client_model extends CI_MODEL{
    
    function setClient($name, $lastname, $email, $phone, $address, $clientID){

        $query = $this->db->query("SELECT id FROM client WHERE clientID = " . $this->db->escape($clientID));
        if ($query->num_rows() > 0){
            //Update
            $this->db->query("UPDATE client SET name = ". $this->db->escape($name).
            ",lastname = " . $this->db->escape($lastname).
            ",email = " . $this->db->escape($email).
            ",phone = " . $this->db->escape($phone).
            ",address = " . $this->db->escape($address).
            " WHERE clientID = " . $this->db->escape($clientID));
        }
        else{
            //Insert
            $this->db->query("INSERT INTO client(name, lastname, email, phone, address, clientID)". 
            "VALUES (".$this->db->escape($name).
            ",".$this->db->escape($lastname).
            ",".$this->db->escape($email).
            ",".$this->db->escape($phone).
            ",".$this->db->escape($address).
            ",".$this->db->escape($clientID).")");
        }

    }

    function getClientByID($id){

        $query = $this->db->query("SELECT * FROM client WHERE id = " . $this->db->escape($id));
        
        return $query->result_array();

    }

    function getClientByClientID($clientID){

        $query = $this->db->query("SELECT * FROM client WHERE clientID = " . $this->db->escape($clientID));
        
        return $query->result_array();

    }

    function getAllClients(){

        $query = $this->db->query("SELECT * FROM client");
        
        return $query->result_array();

    }
}

