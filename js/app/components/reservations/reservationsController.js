F5App.app.controller("reservationController", ['$scope','$rootScope','$timeout','$http',function ($scope, $rootScope,$timeout,$http){
   $scope.timesForReservations = ['08-09','09-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20','20-21','21-22','22-23','23-24'];
   $scope.times = ['08:00 a.m.','09:00 a.m.','10:00 a.m.','11:00 a.m.','12:00 m.d','01:00 p.m.','02:00 p.m.','03:00 p.m.','04:00 p.m.','05:00 p.m.','06:00 p.m.','07:00 p.m.','08:00 p.m.','09:00 p.m.','10:00 p.m.','11:00 p.m.'];
	//var path = ( window.location.pathname.replace('/','').replace(/\/$/, '').split('/').length <= 2 ) ? './' : '../';
   $scope.roles = {'Admin':'1','Dependiente':'2'};
   
   $rootScope.loadReservations = function (){
   		angular.element('#loading-modal').modal('show');
   		angular.element('#dailyResevations').hide();
   		
	   	if( !angular.element('.day div.active').length ){
			angular.element('.day div').first().addClass('active');
			angular.element('.day div').first().parent().addClass('active');
			angular.element('.day div').first().parents('.days_row').addClass('active');
		}
		else{
			angular.element('.day div.active').parent().addClass('active');
			angular.element('.day div.active').parents('.days_row').addClass('active');
		}
		//Set day as active day
		var day = angular.element('.day div.active').text();
		angular.element('#day').val(day);

		var daySelected = angular.element('#calendar .days_row.active .day').index(angular.element('#calendar .days_row.active .day.active'));
						 
		angular.element('#currentDay').html( angular.element('#calendar .days_head .head:eq('+daySelected+')').text() + ' ' +day);

		var req = {
			method: 'POST',
			url: F5App.base_url + "getReservationByDay",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( $scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//$timeout(function(){
				$scope.reservations = $scope.sortReservations(angular.fromJson(response.data));
			//});
			angular.element('#loading-modal').modal('hide');
			angular.element('#dailyResevations').show();
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.loadPitchsPagination = function (){

		var req = {
			method: 'POST',
			url: F5App.base_url + "getPitchByGroup",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( { group: $scope.getGroup() } ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//$timeout(function(){
				$scope.pitchs = angular.fromJson(response.data);
			//});
			angular.element('#pitchs').show();
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

		$scope.pitchValue = angular.element('#pitch').val();
	}

	$scope.sortReservations = function (data){
		var reservations = [],
			tmp = [];

		for(var i=0; i < $scope.timesForReservations.length ; i++){
			reservations[i] = new Array();
		}

		for(i=0; i < $scope.timesForReservations.length ; i++){
			for(var j=0; j < data.length; j++){
				if(data[j].reservation_time === $scope.timesForReservations[i]){
					reservations[i].push(data[j]);
				}
			}
			if( reservations[i].length == 1 && reservations[i][0].type_reservation != 1 && reservations[i][0].team_id == 1 ){
				reservations[i][1] = {};
			}
			else if( reservations[i].length == 1 && reservations[i][0].type_reservation != 1 && reservations[i][0].team_id == 2 ){
				reservations[i][1] = reservations[i][0];
				reservations[i][0] = {};
			}
			else if( reservations[i].length == 0 ){
				reservations[i][0] = {};
				reservations[i][1] = {};
			}
			else if(reservations[i].length == 2 && reservations[i][0].type_reservation != 1 && reservations[i][0].team_id == 2 && reservations[i][1].team_id == 1){
				tmp = reservations[i][0];
				reservations[i][0] = reservations[i][1];
				reservations[i][1] = tmp;
			}
		}
		return reservations;
	}

	$scope.getGroup = function(){
		var group = null;
		$.ajax({

			type: 'POST',

			url : F5App.base_url + "getGroup",

			data: { group_name: angular.element('#group').val() || window.location.pathname.replace('/','').replace(/\/$/, '').split('/')[1] },

			async : false,

			success : function(response){
				group = jQuery.parseJSON(response)[0].id;
			}
		});
		return group;
	}

	$scope.getPitch = function(){
		return angular.element('#pitch').val() || window.location.pathname.replace('/','').replace(/\/$/, '').split('/')[2];
	}

	$rootScope.getDataForTemporaryReservation = function(){
		return { 	reservation_year : angular.element('#year').val(), 
					reservation_month : angular.element('#month').val(), 
					reservation_day : angular.element('#day').val(), 
					group_id : $scope.getGroup(), 
					pitch_id : $scope.getPitch(),
					team_id : angular.element('#team_id').val(),
					reservation_time : angular.element('#reservation_time').val(),
					id_user : ( angular.element('#id_user').val() ) ? angular.element('#id_user').val() : '0'
				};
	}

	$rootScope.getDataForReservation = function(){
		var data = $scope.getDataForTemporaryReservation();
		data.name = $rootScope.fields.name.capitalize();
		data.lastname = $rootScope.fields.lastname1.capitalize() + ' ' + $rootScope.fields.lastname2.capitalize();
		data.phone = $rootScope.fields.phone;
		data.email = $rootScope.fields.email;
		data.type_reservation = $rootScope.fields.typeReservation;
		data.referee_required = (!!$scope.fields.setReferee) ? '1' : '0';
		data.setPitchAllWeeks = !!$rootScope.fields.setPitchAllWeeks;
		//data.id_user = ( angular.element('#id_user').val() ) ? angular.element('#id_user').val() : '0';
		return data;
	}

	$rootScope.setStateTemporaryReservation = function(data){

		var req = {
			method: 'POST',
			url: F5App.base_url + "setTemporaryReservationState",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( data ),
		 	cache : false
		}

		$http(req).then(function(response) {},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.getDateFromServer = function(){
		$.ajax({

			type: 'POST',

			url : F5App.base_url + "getDateFromServer",

			async : false,

			success : function(response){
				$timeout(function(){
					$scope.dateFromServer = ( !!Date.parse(response) ) ? response : response.replace(/-/g,'/') + ' GMT';
				});
			}
		});
	}

	$rootScope.getRates = function(){
		var req = {
			method: 'POST',
			url: F5App.base_url + "getRates",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	cache : false
		}

		$http(req).then(function(response) {
			$rootScope.rates = angular.fromJson(response.data);
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$rootScope.isDateForBookingValid = function(){
		return  new Date(angular.element('#year').val(),angular.element('#month').val() - 1,angular.element('#day').val(),'23','59','59') > new Date($scope.dateFromServer);
	}

	$rootScope.isAdminUser = function(){
		return ( !!angular.element('#isAdminUser').val() && /admin/.test(location.href) );
	}

	$rootScope.getRol = function(){
		return angular.element('#rol_user').val();
	}

	$rootScope.isRol = function(rol){
		return $scope.roles[rol];
	} 

	$rootScope.getGroupUser = function(){
		return angular.element('#group_user').val();
	}

	$rootScope.calculateDayPerWeek = function(){
		var range = 1, daysPerWeek = 7, daysPerYear = 365;
		var data = new Array(),
			reservation_day,
			reservation_month,
			reservation_year;

		data.push([angular.element('#day').val(),angular.element('#month').val(),angular.element('#year').val()]);	
		for(var i = range; i<= daysPerYear ; i++){
			var from = new Date(angular.element('#year').val(),angular.element('#month').val() - 1,angular.element('#day').val());
			var to = new Date(angular.element('#year').val(),angular.element('#month').val() - 1,angular.element('#day').val());
			to.setDate(from.getDate() + i);
			if( i % daysPerWeek  == 0 ){
				reservation_day = to.getDate().toString();
				reservation_month = (to.getMonth() + 1).toString();
				reservation_year = to.getFullYear().toString();
				data.push([reservation_day,reservation_month,reservation_year]);	
			}
		}
		return data;
	}

	$rootScope.sendEmail = function(data){
		angular.element('#sending-email-modal').modal('show');
		var req = {
			method: 'POST',
			url: F5App.base_url + "sendEmail",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			angular.element('#sending-email-modal').modal('hide');
			$scope.loadReservations();
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$rootScope.sendSMS = function(data){
		angular.element('#sending-sms-modal').modal('show');
		var req = {
			method: 'POST',
			url: F5App.base_url + "sendSMS",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			angular.element('#sending-sms-modal').modal('hide');
			$scope.loadReservations();
	
		}).error(function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$rootScope.getCorrectTimeReservation = function(time){
		return $scope.times[$scope.timesForReservations.indexOf(time)];
	}


	angular.element(window).bind("beforeunload", function(e) { 
		if( (/admin/.test(location.href) || /reservaciones/.test(location.href)) && !F5App.leaveSafelyPage ){
		    var data = $rootScope.getDataForTemporaryReservation();
			data.state = '3'; 
			$scope.setStateTemporaryReservation(data);
			//return confirm();
			var confirmationMessage = " ";

			  (e || window.event).returnValue = confirmationMessage; 
			  return confirmationMessage;
		}
	});

	$rootScope.fields = {
		name : '',
		lastname1 : '',
		lastname2 : '',
		phone : '',
		email : '',
		typeReservation : '',
		setReferee : '',
		password : '',
		confirmation : '',
		client : '',
		typeReservationSelected : '',
		setPitchAllWeeks : '',
		stepReservation : 1,
		accountName : ''
	}

	$scope.loadReservations();
	$scope.loadPitchsPagination();
}]);

angular.element(document).ready(function(){
	angular.element('body').delegate('a','click', function(){
		F5App.leaveSafelyPage = true;
	});

	angular.element('#calendar .header').on('mouseenter', function(){
		angular.element('.days_head, .days_row').show();
	});

	angular.element('#currentDate').on('click', function(){
		angular.element('.days_head, .days_row').show();
	});

	angular.element('#calendar').on('mouseleave', function(){
		angular.element('.days_head, .days_row').hide();
	});
});
