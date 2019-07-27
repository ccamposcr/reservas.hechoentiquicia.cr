<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Email_ctrl extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->library('email');
    }

    public function sendEmail(){

        $config['protocol'] = 'smtp';
        //$config['wordwrap'] = TRUE;
        $config['smtp_host'] = 'ssl://smtpout.secureserver.net';
        $config['smtp_user'] = 'reserva@hechoentiquicia.cr';
        $config['smtp_pass'] = '';
        //$config['smtp_pass'] = 'Reserva2014';
        $config['smtp_port'] = '465';
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $config['newline'] = "\r\n";
        $config['crlf'] = "\r\n";
        
        
        $this->email->initialize($config);

        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : '';
        $data_reservation = ( isset($_POST['data_reservation']) ) ? $_POST['data_reservation'] : '';
        $this->email->from('reserva@hechoentiquicia.cr', 'Reservas');
        $this->email->to($email); 
        //$this->email->cc('reserva@f5.cr'); 
        $this->email->subject('HT Digital | Su reservación se ha efectuado correctamente');
        $this->email->message($data_reservation);
        $this->email->send();
        echo $this->email->print_debugger();
    }

    public function sendSMS(){

        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'ssl://smtpout.secureserver.net';
        $config['smtp_user'] = 'reserva@hechoentiquicia.cr';
        $config['smtp_pass'] = '';
        //$config['smtp_pass'] = 'Reserva2014';
        $config['smtp_port'] = '465';
        $config['mailtype'] = 'text';
        //$config['charset'] = 'utf-8';
        $config['newline'] = "\r\n";
        $config['crlf'] = "\r\n";
        
        $this->email->initialize($config);

        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : '';
        $data_reservation = ( isset($_POST['data_reservation']) ) ? $_POST['data_reservation'] : '';
        $this->email->from('reserva@hechoentiquicia.cr', 'Reservas');
        $this->email->to('ccamposcr@gmail.com'); 
        $this->email->subject($phone);
        //$this->email->subject('88308780');
        $this->email->message($data_reservation);
        $this->email->send();
        echo $this->email->print_debugger();

        /*$this->email->subject('83180160');
        $this->email->message($data_reservation);
        $this->email->send();
        echo $this->email->print_debugger();*/
    }
}