<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("apim");
    }

    public function getReservationByTime(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $reservation = $this->apim->getReservationByTime($team_id,$reservation_year,$reservation_month,$reservation_day,$reservation_time,$group_id,$pitch_id);
        echo json_encode($reservation);
    }

    public function getReservationByDay(){
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $reservation = $this->apim->getReservationByDay($reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id);
        echo json_encode($reservation);
    }

    public function getPitchByGroup(){
        $group = ( isset($_POST['group']) ) ? strip_tags($_POST['group']) : '1';
        $pitchs = $this->apim->getPitchByGroup($group);
        echo json_encode($pitchs);
    }

    public function getGroup(){
        $group_name = ( isset($_POST['group_name']) ) ? strip_tags($_POST['group_name']) : 'complejo1';
        $id_group = $this->apim->getGroup($group_name);
        echo json_encode($id_group);
    }

    public function getTemporaryReservationState(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $state = $this->apim->getTemporaryReservationState($team_id,$reservation_time,$reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id);
        echo json_encode($state);
    }

    public function setTemporaryReservationState(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $state = ( isset($_POST['state']) ) ? strip_tags($_POST['state']) : 3;
        $this->apim->setTemporaryReservationState($team_id,$reservation_time,$reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id,$state);
    }

    public function checkIfReservationExist(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $result = $this->apim->checkIfReservationExist($team_id,$reservation_time,$reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id);
        echo json_encode($result);
    }

    public function createReservation(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : 1;
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : 1;
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : 1;
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : 1;
        $type_reservation = ( isset($_POST['type_reservation']) ) ? strip_tags($_POST['type_reservation']) : 1;
        $referee_required = ( isset($_POST['referee_required']) ) ? strip_tags($_POST['referee_required']) : 1;
        $setPitchAllWeeks = ( isset($_POST['setPitchAllWeeks']) ) ? strip_tags($_POST['setPitchAllWeeks']) : 0;
        //$reservation_price = ( isset($_POST['reservation_price']) ) ? strip_tags($_POST['reservation_price']) : 1;
        $id_user = ( isset($_POST['id_user']) ) ? strip_tags($_POST['id_user']) : 0;

        /* -- Specific Rates -- */
        $rates = $this->apim->getRates();
        $date = date('w', strtotime($reservation_year.'-'.$reservation_month.'-'.$reservation_day));
        $isWeekend = ($date == 6 || $date == 0);
        $hourSelected = explode("-",$reservation_time)[0];

        for($i = 0; $i < count($rates); $i++){
            if( $rates[$i]->weekend == $isWeekend && (int) $hourSelected >= (int) $rates[$i]->hora_inicio && (int) $hourSelected <= (int) $rates[$i]->hora_final ){
                $specificRates = $rates[$i];
                break;
            }
        }
        /* -- Specific Rates End -- */

        $cancha_completa = $specificRates->cancha_completa;
        $arbitro = $specificRates->arbitro;
        $cancha_fija_completa_deposito = $specificRates->cancha_fija_completa_deposito;
        $cancha_fija_reto_deposito = $specificRates->cancha_fija_reto_deposito;
        $total_CRC = 0;

        $total_CRC += ($type_reservation == '1') ? $cancha_completa : $cancha_completa/2 ;
        if( $referee_required == '1' ){
            $total_CRC += ($type_reservation == '1') ? $arbitro : $arbitro/2 ;
        }
        if( $setPitchAllWeeks == 'true' ){
            $total_CRC += ($type_reservation == '1') ? $cancha_fija_completa_deposito : $cancha_fija_reto_deposito;
        }
        $reservation_price = $total_CRC;

        $this->apim->createReservation($team_id,$reservation_time,$reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id,$name,$lastname,$phone,$email,$type_reservation,$referee_required,$reservation_price,$id_user,0);
    }

    public function setInactiveReservation(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $this->apim->setInactiveReservation($team_id,$reservation_time,$reservation_year,$reservation_month,$reservation_day,$group_id,$pitch_id);
    }

    public function getClientsData(){
        $result = $this->apim->getClientsData();
        echo json_encode($result);
    }

    public function reserveAllWeeksSameDay(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : 1;
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : 1;
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : 1;
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : 1;
        $type_reservation = ( isset($_POST['type_reservation']) ) ? strip_tags($_POST['type_reservation']) : 1;
        $referee_required = ( isset($_POST['referee_required']) ) ? strip_tags($_POST['referee_required']) : 1;
        $setPitchAllWeeks = ( isset($_POST['setPitchAllWeeks']) ) ? strip_tags($_POST['setPitchAllWeeks']) : 0;
        //$reservation_price = ( isset($_POST['reservation_price']) ) ? strip_tags($_POST['reservation_price']) : 1;
        $dates = ( isset($_POST['dates']) ) ? $_POST['dates'] : '0';
        $id_user = ( isset($_POST['id_user']) ) ? strip_tags($_POST['id_user']) : 0;
        $res;
        $id_group_all_weeks = uniqid();

        /* -- Specific Rates -- */
        $rates = $this->apim->getRates();
        $date = date('w', strtotime($reservation_year.'-'.$reservation_month.'-'.$reservation_day));
        $isWeekend = ($date == 6 || $date == 0);
        $hourSelected = explode("-",$reservation_time)[0];

        for($i = 0; $i < count($rates); $i++){
            if( $rates[$i]->weekend == $isWeekend && (int) $hourSelected >= (int) $rates[$i]->hora_inicio && (int) $hourSelected <= (int) $rates[$i]->hora_final ){
                $specificRates = $rates[$i];
                break;
            }
        }
        /* -- Specific Rates End -- */

        $cancha_completa = $specificRates->cancha_completa;
        $arbitro = $specificRates->arbitro;
        $cancha_fija_completa_deposito = $specificRates->cancha_fija_completa_deposito;
        $cancha_fija_reto_deposito = $specificRates->cancha_fija_reto_deposito;
        $total_CRC = 0;

        $total_CRC += ($type_reservation == '1') ? $cancha_completa : $cancha_completa/2 ;
        if( $referee_required == '1' ){
            $total_CRC += ($type_reservation == '1') ? $arbitro : $arbitro/2 ;
        }
        if( $setPitchAllWeeks == 'true' ){
            $total_CRC += ($type_reservation == '1') ? $cancha_fija_completa_deposito : $cancha_fija_reto_deposito;
        }
        $reservation_price = $total_CRC;


        foreach ($dates as $key => $value) {
            if( !$this->apim->checkIfReservationExist($team_id,$reservation_time,$value[2],$value[1],$value[0],$group_id,$pitch_id) ){
                $this->apim->createReservation($team_id,$reservation_time,$value[2],$value[1],$value[0],$group_id,$pitch_id,$name,$lastname,$phone,$email,$type_reservation,$referee_required,$reservation_price,$id_user,$id_group_all_weeks);
                $this->apim->setTemporaryReservationState($team_id,$reservation_time,$value[2],$value[1],$value[0],$group_id,$pitch_id,'5');
                $res[$key] = true;
            }
            else{
                $res[$key] = false;
            }
        }
        echo json_encode($res);
    }

    public function setInactiveReservationAllWeeks(){
        $id_group_all_weeks = ( isset($_POST['id_group_all_weeks']) ) ? strip_tags($_POST['id_group_all_weeks']) : '1';
        $this->apim->setInactiveReservationAllWeeks($id_group_all_weeks);
    }

    public function checkAvailability(){
        $team_id = ( isset($_POST['team_id']) ) ? strip_tags($_POST['team_id']) : '1';
        $reservation_time = ( isset($_POST['reservation_time']) ) ? strip_tags($_POST['reservation_time']) : '08-09';
        $reservation_year = ( isset($_POST['reservation_year']) ) ? strip_tags($_POST['reservation_year']) : date("Y", time());
        $reservation_month = ( isset($_POST['reservation_month']) ) ? strip_tags($_POST['reservation_month']) : date("m", time());
        $reservation_day = ( isset($_POST['reservation_day']) ) ? strip_tags($_POST['reservation_day']) : date("d", time());
        $group_id = ( isset($_POST['group_id']) ) ? strip_tags($_POST['group_id']) : 1;
        $pitch_id = ( isset($_POST['pitch_id']) ) ? strip_tags($_POST['pitch_id']) : 1;
        $dates = ( isset($_POST['dates']) ) ? $_POST['dates'] : '0';
        $res;
        foreach ($dates as $key => $value) {
            if( !$this->apim->checkIfReservationExist($team_id,$reservation_time,$value[2],$value[1],$value[0],$group_id,$pitch_id) ){
                $res[$key] = true;
            }
            else{
                $res[$key] = false;
            }
        }
        echo json_encode($res);
    }

    public function testSMS(){
        $result = $this->apim->testSMS();
        //echo json_encode($result);
    }

    public function getDateFromServer(){
        echo unix_to_human(time());
    }

    public function getRates(){
        $result = $this->apim->getRates();
        echo json_encode($result);
    }

    public function getAccountsData(){
        $result = $this->apim->getAccountsData();
        echo json_encode($result);
    }

    public function changeRates(){
        $updatedRates = ( isset($_POST['updatedRates']) ) ? strip_tags($_POST['updatedRates']) : '';
        $this->apim->changeRates($updatedRates);
    }

    public function updateResevation(){
        $id = ( isset($_POST['id']) ) ? strip_tags($_POST['id']) : '1';
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : '';
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : '';
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : '';
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : '';
        $this->apim->updateResevation($id,$name,$lastname,$phone,$email);
    }

    public function updateReservationAllWeeks(){
        $id_group_all_weeks = ( isset($_POST['id_group_all_weeks']) ) ? strip_tags($_POST['id_group_all_weeks']) : '1';
        $name = ( isset($_POST['name']) ) ? strip_tags($_POST['name']) : '';
        $lastname = ( isset($_POST['lastname']) ) ? strip_tags($_POST['lastname']) : '';
        $phone = ( isset($_POST['phone']) ) ? strip_tags($_POST['phone']) : '';
        $email = ( isset($_POST['email']) ) ? strip_tags($_POST['email']) : '';
        $this->apim->updateReservationAllWeeks($id_group_all_weeks,$name,$lastname,$phone,$email);
    }
}