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

$route['default_controller'] = "pages_controller";
$route['404_override'] = 'pages_controller/page_404';
$route['translate_uri_dashes'] = FALSE;

//Reservaciones Routes

//complejo2
$route['complejo2/(:num)/reservaciones'] = 'calendar_controller/calendar/';
$route['complejo2/(:num)/reservaciones/(:num)/(:any)'] = 'calendar_controller/calendar/$2/$3';

//complejo1
$route['complejo1/(:num)/reservaciones'] = 'calendar_controller/calendar/';
$route['complejo1/(:num)/reservaciones/(:num)/(:any)'] = 'calendar_controller/calendar/$2/$3';

/*  ------------------------------------------------------------------ */

//Admin Routes

//complejo2
$route['complejo2/(:num)/admin'] = 'calendar_controller/admin/';
$route['complejo2/(:num)/admin/(:num)/(:any)'] = 'calendar_controller/admin/$2/$3';

//complejo1
$route['complejo1/(:num)/admin'] = 'calendar_controller/admin/';
$route['complejo1/(:num)/admin/(:num)/(:any)'] = 'calendar_controller/admin/$2/$3';

/* ------------------------------------------------------------------- */

//Services Routs
$route['getReservationByDay'] = 'api_controller/getReservationByDay';
$route['getReservationByTime'] = 'api_controller/getReservationByTime';
$route['getPitchByGroup'] = 'api_controller/getPitchByGroup';
$route['getGroup'] = 'api_controller/getGroup';
$route['getTemporaryReservationState'] = 'api_controller/getTemporaryReservationState';
$route['setTemporaryReservationState'] = 'api_controller/setTemporaryReservationState';
$route['checkIfReservationExist'] = 'api_controller/checkIfReservationExist';
$route['createReservation'] = 'api_controller/createReservation';
$route['setInactiveReservation'] = 'api_controller/setInactiveReservation';
$route['setInactiveReservationAllWeeks'] = 'api_controller/setInactiveReservationAllWeeks';
$route['checkExpiredReservations'] = 'check_expired_reservations_controller/checkExpiredReservations';
$route['deleteAllTmpReservationsEndDay'] = 'check_expired_reservations_controller/deleteAllTmpReservationsEndDay';
$route['sendEmail'] = 'email_controller/sendEmail';
$route['sendSMS'] = 'email_controller/sendSMS';
$route['getClientsData'] = 'api_controller/getClientsData';
$route['changePassword'] = 'login_controller/changePassword';
$route['reserveAllWeeksSameDay'] = 'api_controller/reserveAllWeeksSameDay';
$route['checkAvailability'] = 'api_controller/checkAvailability';
$route['acceptCreditCardPayment'] = 'paypal_controller/acceptCreditCardPayment';
$route['getDateFromServer'] = 'api_controller/getDateFromServer';
$route['getRates'] = 'api_controller/getRates';
$route['getAccountsData'] = 'api_controller/getAccountsData';
$route['changeRates'] = 'api_controller/changeRates';
$route['updateResevation'] = 'api_controller/updateResevation';
$route['updateReservationAllWeeks'] = 'api_controller/updateReservationAllWeeks';

//Login - Logout Routes
$route['(:any)/login'] = 'login_controller';
$route['(:any)/verifyLogin'] = 'login_controller/verify';

/* ------------------------------------------------------------------- */
//Pages Routes
$route['(:any)/accesoDenegado'] = 'pages_controller/access_denied';
$route['logout'] = 'admin_controller/logout';
