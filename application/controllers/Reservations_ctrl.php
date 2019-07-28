<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reservations_ctrl extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $next_prev_controller = $this->session->userdata('logged_in') ? 'admin' : 'reservaciones';
        $prefs = array (
           'start_day'    => 'lunes',
           'month_type'   => 'long',
           'day_type'     => 'abr',
           'show_next_prev' => 'true',
           'next_prev_url' => base_url() . $this->uri->segment(1) . '/' . $this->uri->segment(2) . '/' . $next_prev_controller,
           'local_time' => time()
         );

        $prefs['template'] = '
        {table_open}<table>{/table_open}

        {heading_row_start}<tr class="header">{/heading_row_start}

        {heading_previous_cell}<th><a class="prev" href="{previous_url}"><<</a></th>{/heading_previous_cell}

        {heading_title_cell}<th id="currentDate" colspan="{colspan}"><span id="currentDay"></span> {heading}</th>{/heading_title_cell}

        {heading_next_cell}<th><a class="next" href="{next_url}">>></a></th>{/heading_next_cell}

        {heading_row_end}</tr>{/heading_row_end}

        {week_row_start}<tr class="days_head">{/week_row_start}
        {week_day_cell}<td class="head">{week_day}</td>{/week_day_cell}
        {week_row_end}</tr>{/week_row_end}


        {cal_row_start}<tr class="days_row">{/cal_row_start}
        {cal_cell_start}<td class="day">{/cal_cell_start}

        {cal_cell_content}
        <div class="loadDay">{day}</div>
        {/cal_cell_content}

        {cal_cell_content_today}
        <div load-day class="today active">{day}</div>
        {/cal_cell_content_today}

        {cal_cell_no_content}
        <div load-day>{day}</div>
        {/cal_cell_no_content}

        {cal_cell_no_content_today}
        <div load-day class="today active">{day}</div>
        {/cal_cell_no_content_today}

        {cal_cell_blank}<span class="noContent">&nbsp;</span>{/cal_cell_blank}
        {cal_cell_end}</td>{/cal_cell_end}
        {cal_row_end}</tr>{/cal_row_end}

        {table_close}</table>{/table_close}';
        $this->load->library('calendar', $prefs);
        $this->load->model("Api_model");
    }



    public function reservations($year = null, $month = null){

        if($this->session->userdata('logged_in'))
        {
            redirect($this->uri->segment(1) . '/' . $this->uri->segment(2) . '/admin');
        } else {
            $data['calendar'] = $this->calendar->generate($year, $month);
            $headerOptions = simplexml_load_file("xml/header.xml");
            $this->load->view('includes/header', $headerOptions->internal);
            $this->load->view('includes/userStatus');
            $this->load->view('reservations_view', $data);
            $this->load->view('modals_view');

            $footerOptions = simplexml_load_file("xml/footer.xml");

            switch ( $this->uri->segment(1) ) {
                case 'complejo1':
                    $footerOptions = $footerOptions->complejo1;
                    break;
                
               case 'complejo2':
                    $footerOptions = $footerOptions->complejo2;
                    break;
            }

            $this->load->view('includes/footer', $footerOptions);
        }
    }

    public function admin($year = null, $month = null){

        if($this->session->userdata('logged_in'))
        {
            $session_data = $this->session->userdata('logged_in');
            $rol = $session_data['rol'];
            $groupManager = $session_data['groupManager'];

            if( $this->Api_model->getGroup($this->uri->segment(1))[0]->id != $groupManager && $rol == $this->Api_model->getIdRol('Dependiente')[0]->id){
                redirect($this->uri->segment(1) . '/accesoDenegado');
            }


            $data['calendar'] = $this->calendar->generate($year, $month);
            $headerOptions = simplexml_load_file("xml/header.xml");
            $this->load->view('includes/header', $headerOptions->internal);
            $session['session_data'] = $this->session->userdata('logged_in');
            $this->load->view('includes/userStatus', $session );
            $this->load->view('reservations_view', $data);
            $this->load->view('modals_views');
            
            $footerOptions = simplexml_load_file("xml/footer.xml");

            switch ( $this->uri->segment(1) ) {
                case 'complejo1':
                    $footerOptions = $footerOptions->complejo1;
                    break;
                
               case 'complejo2':
                    $footerOptions = $footerOptions->complejo2;
                    break;
            }

            $this->load->view('includes/footer', $footerOptions);
        } else {
            redirect($this->uri->segment(1) . '/login');
        }
    }

}

/* End of file Reservations_ctrl.php */
/* Location: ./application/controllers/Reservations_ctrl.php */