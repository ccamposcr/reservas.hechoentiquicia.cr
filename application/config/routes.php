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

$route['default_controller'] = "pages";
$route['404_override'] = 'pages/page_404';
$route['translate_uri_dashes'] = FALSE;

//Reservaciones Routes

//complejo2
$route['complejo2/(:num)/reservaciones'] = 'calendar/calendar/';
$route['complejo2/(:num)/reservaciones/(:num)/(:any)'] = 'calendar/calendar/$2/$3';

//complejo1
$route['complejo1/(:num)/reservaciones'] = 'calendar/calendar/';
$route['complejo1/(:num)/reservaciones/(:num)/(:any)'] = 'calendar/calendar/$2/$3';

/*  ------------------------------------------------------------------ */

//Admin Routes

//complejo2
$route['complejo2/(:num)/admin'] = 'calendar/admin/';
$route['complejo2/(:num)/admin/(:num)/(:any)'] = 'calendar/admin/$2/$3';

//complejo1
$route['complejo1/(:num)/admin'] = 'calendar/admin/';
$route['complejo1/(:num)/admin/(:num)/(:any)'] = 'calendar/admin/$2/$3';

/* ------------------------------------------------------------------- */

//Services Routs
$route['getReservationByDay'] = 'api/getReservationByDay';
$route['getReservationByTime'] = 'api/getReservationByTime';
$route['getPitchByGroup'] = 'api/getPitchByGroup';
$route['getGroup'] = 'api/getGroup';
$route['getTemporaryReservationState'] = 'api/getTemporaryReservationState';
$route['setTemporaryReservationState'] = 'api/setTemporaryReservationState';
$route['checkIfReservationExist'] = 'api/checkIfReservationExist';
$route['createReservation'] = 'api/createReservation';
$route['setInactiveReservation'] = 'api/setInactiveReservation';
$route['setInactiveReservationAllWeeks'] = 'api/setInactiveReservationAllWeeks';
$route['checkExpiredReservations'] = 'checkexpiredreservations/checkExpiredReservations';
$route['deleteAllTmpReservationsEndDay'] = 'checkexpiredreservations/deleteAllTmpReservationsEndDay';
$route['sendEmail'] = 'email/sendEmail';
$route['sendSMS'] = 'email/sendSMS';
$route['getClientsData'] = 'api/getClientsData';
$route['changePassword'] = 'login/changePassword';
$route['reserveAllWeeksSameDay'] = 'api/reserveAllWeeksSameDay';
$route['checkAvailability'] = 'api/checkAvailability';
$route['acceptCreditCardPayment'] = 'paypal/acceptCreditCardPayment';
$route['getDateFromServer'] = 'api/getDateFromServer';
$route['getRates'] = 'api/getRates';
$route['getAccountsData'] = 'api/getAccountsData';
$route['changeRates'] = 'api/changeRates';
$route['updateResevation'] = 'api/updateResevation';
$route['updateReservationAllWeeks'] = 'api/updateReservationAllWeeks';

//Login - Logout Routes
$route['(:any)/login'] = 'login';
$route['(:any)/verifyLogin'] = 'login/verify';

/* ------------------------------------------------------------------- */
//Pages Routes
$route['(:any)/accesoDenegado'] = 'pages/access_denied';
$route['logout'] = 'admin/logout';
