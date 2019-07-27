<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/

$route['default_controller'] = "Pages_ctrl";
$route['404_override'] = 'Pages_ctrl/page_404';
$route['translate_uri_dashes'] = FALSE;

//Reservaciones Routes

//complejo2
$route['complejo2/(:num)/reservaciones'] = 'Reservations_ctrl/reservations/';
$route['complejo2/(:num)/reservaciones/(:num)/(:any)'] = 'Reservations_ctrl/reservations/$2/$3';

//complejo1
$route['complejo1/(:num)/reservaciones'] = 'Reservations_ctrl/reservations/';
$route['complejo1/(:num)/reservaciones/(:num)/(:any)'] = 'Reservations_ctrl/reservations/$2/$3';

/*  ------------------------------------------------------------------ */

//Admin Routes

//complejo2
$route['complejo2/(:num)/admin'] = 'Reservations_ctrl/admin/';
$route['complejo2/(:num)/admin/(:num)/(:any)'] = 'Reservations_ctrl/admin/$2/$3';

//complejo1
$route['complejo1/(:num)/admin'] = 'Reservations_ctrl/admin/';
$route['complejo1/(:num)/admin/(:num)/(:any)'] = 'Reservations_ctrl/admin/$2/$3';

/* ------------------------------------------------------------------- */

//Services Routs
$route['getReservationByDay'] = 'Api_ctrl/getReservationByDay';
$route['getReservationByTime'] = 'Api_ctrl/getReservationByTime';
$route['getPitchByGroup'] = 'Api_ctrl/getPitchByGroup';
$route['getGroup'] = 'Api_ctrl/getGroup';
$route['getTemporaryReservationState'] = 'Api_ctrl/getTemporaryReservationState';
$route['setTemporaryReservationState'] = 'Api_ctrl/setTemporaryReservationState';
$route['checkIfReservationExist'] = 'Api_ctrl/checkIfReservationExist';
$route['createReservation'] = 'Api_ctrl/createReservation';
$route['setInactiveReservation'] = 'Api_ctrl/setInactiveReservation';
$route['setInactiveReservationAllWeeks'] = 'Api_ctrl/setInactiveReservationAllWeeks';
$route['checkExpiredReservations'] = 'Check_expired_reservations/checkExpiredReservations';
$route['deleteAllTmpReservationsEndDay'] = 'Check_expired_reservations/deleteAllTmpReservationsEndDay';
$route['sendEmail'] = 'Email_ctrl/sendEmail';
$route['sendSMS'] = 'Email_ctrl/sendSMS';
$route['getClientsData'] = 'Api_ctrl/getClientsData';
$route['changePassword'] = 'Login_ctrl/changePassword';
$route['reserveAllWeeksSameDay'] = 'Api_ctrl/reserveAllWeeksSameDay';
$route['checkAvailability'] = 'Api_ctrl/checkAvailability';
$route['acceptCreditCardPayment'] = 'Paypal_ctrl/acceptCreditCardPayment';
$route['getDateFromServer'] = 'Api_ctrl/getDateFromServer';
$route['getRates'] = 'Api_ctrl/getRates';
$route['getAccountsData'] = 'Api_ctrl/getAccountsData';
$route['changeRates'] = 'Api_ctrl/changeRates';
$route['updateResevation'] = 'Api_ctrl/updateResevation';
$route['updateReservationAllWeeks'] = 'Api_ctrl/updateReservationAllWeeks';

//Login - Logout Routes
$route['(:any)/login'] = 'Login_ctrl';
$route['(:any)/verifyLogin'] = 'Login_ctrl/verify';

/* ------------------------------------------------------------------- */
//Pages Routes
$route['(:any)/accesoDenegado'] = 'Pages_ctrl/access_denied';
$route['logout'] = 'Admin_ctrl/logout';
