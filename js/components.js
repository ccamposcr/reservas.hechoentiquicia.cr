////ATTENTION!/////
//components.js is a generated file. To edit the source go to /js/components/index.js

App.getAppInstance().controller("headerController", ['$scope',function ($scope){

    $scope.setActive = function (){

		var location = window.location.pathname;

		$scope.menuOptionActive = location;

    };

}]);
//App.getAppInstance().controller("modalController", ['$scope','$rootScope','$interval','$timeout', function ($scope, $rootScope,$interval, $timeout){
	App.getAppInstance().controller("modalController", ['$scope','$rootScope','$uibModal','$log','$document', function ($scope, $rootScope,$uibModal,$log,$document){
		var $modalCtrl = this;
		$modalCtrl.items = ['item1', 'item2', 'item3'];

		$modalCtrl.animationsEnabled = false;
	  
		$modalCtrl.open = function (size, parentSelector) {
		  var parentElem = parentSelector ? 
			angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
		  var modalInstance = $uibModal.open({
			animation: $modalCtrl.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: '$modalCtrl',
			size: size,
			appendTo: parentElem,
			resolve: {
			  items: function () {
				return $modalCtrl.items;
			  }
			}
		  });
	  
		  modalInstance.result.then(function (selectedItem) {
			$modalCtrl.selected = selectedItem;
		  }, function () {
			$log.info('Modal dismissed at: ' + new Date());
		  });
		};
	/*angular.element('#formReservationModal').on('hidden.bs.modal', function(){
		
		if( !$scope.successReservation ){
			var data = $rootScope.getDataForTemporaryReservation();
			data.state = '3'; 
			$scope.setStateTemporaryReservation(data);
		}
		//$scope.$apply(function(){
			if( $scope.isAdminUser() ){
				$scope.bookingType = 'bookingOnLine';
			}
			else{
				$scope.bookingType = '';
			}
		//});
		$scope.clearReservationForm();
		angular.element('#bookingForm').show();
        angular.element('#carDataForm').hide();
		//$scope.loadReservations();
		
	});*/

	/*angular.element('#edit-account-modal').on('hidden.bs.modal', function(){
		$timeout(function(){
			$scope.fields.password = '';
			$scope.fields.confirmation = '';
			$scope.fields.nameAccountToEdit = '';

			$scope.changePassForm.password.$pristine = true;
			$scope.changePassForm.password.$dirty = false;

			$scope.changePassForm.confirmation.$pristine = true;
			$scope.changePassForm.confirmation.$dirty = false;

			$scope.changePassForm.nameAccountToEdit.$pristine = true;
			$scope.changePassForm.nameAccountToEdit.$dirty = false;
		});
	});*/

	/*angular.element('#edit-account-modal').on('show.bs.modal', function(){
		$timeout(function(){
			$scope.fields.userToEdit = angular.element('#name_user').val();
		});
	});*/

	/*angular.element('#formReservationModal').on('show.bs.modal', function(){
		$scope.successReservation = false;
	});

	angular.element('#search-modal').on('hidden.bs.modal', function(){
		$scope.fields.client = '';
		$scope.searchText = '';
	});

	angular.element('#show-info-modal').on('hidden.bs.modal', function(){
		$scope.fields.deleteAllCccurrences = '';
		$scope.fields.editAllCccurrences = '';
	});

	angular.element('#edit-rates-modal').on('show.bs.modal', function(){
		$scope.getRates();
	});

	var onCancel = function(){
		//angular.element('#formReservationModal').modal('hide');
	}

	var onContinue = function(){
		//Continue
	}*/

	/*angular.element('#cancelReservationBtn').confirmation({
		onConfirm : onContinue,
		onCancel : onCancel
	});*/

	/*$scope.clearReservationForm = function(){
		$scope.fields.email = '';
		$scope.fields.lastname1 = '';
		$scope.fields.lastname2 = '';
		$scope.fields.name = '';
		$scope.fields.phone = '';
		$scope.fields.setReferee = '';
		$scope.fields.typeReservationSelected = 'normal';
		$scope.fields.typeReservation = '';
		$scope.fields.setPitchAllWeeks = '';
		$scope.fields.stepReservation = 1;
		$scope.fields.number = '';
		$scope.fields.type = '';
		$scope.fields.expire_month = '';
		$scope.fields.expire_year = '';
		$scope.fields.cvv2 = '';


		$scope.bookingForm.email.$dirty = false;
		$scope.bookingForm.lastname1.$dirty = false;
		$scope.bookingForm.lastname2.$dirty = false;
		$scope.bookingForm.name.$dirty = false;
		$scope.bookingForm.phone.$dirty = false;

		$scope.bookingForm.email.$pristine = true;
		$scope.bookingForm.lastname1.$pristine = true;
		$scope.bookingForm.lastname2.$pristine = true;
		$scope.bookingForm.name.$pristine = true;
		$scope.bookingForm.phone.$pristine = true;

		if( !$scope.isAdminUser() ){
			$scope.carDataForm.number.$dirty = false;
			$scope.carDataForm.type.$dirty = false;
			$scope.carDataForm.expire_month.$dirty = false;
			$scope.carDataForm.expire_year.$dirty = false;
			$scope.carDataForm.cvv.$dirty = false;

			$scope.carDataForm.number.$pristine = true;
			$scope.carDataForm.type.$pristine = true;
			$scope.carDataForm.expire_month.$pristine = true;
			$scope.carDataForm.expire_year.$pristine = true;
			$scope.carDataForm.cvv.$pristine = true;
		}
		
		$interval.cancel($scope.timeInterval);
		$scope.time = '00:10:00';
	}*/

}]);

App.getAppInstance().controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
	var $ctrl = this;
	$ctrl.items = items;
	$ctrl.selected = {
	  item: $ctrl.items[0]
	};
  
	$ctrl.ok = function () {
	  $uibModalInstance.close($ctrl.selected.item);
	};
  
	$ctrl.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
  });
  
  // Please note that the close and dismiss bindings are from $uibModalInstance.
  
  App.getAppInstance().component('modalComponent', {
	templateUrl: 'myModalContent.html',
	bindings: {
	  resolve: '<',
	  close: '&',
	  dismiss: '&'
	},
	controller: function () {
	  var $ctrl = this;
  
	  $ctrl.$onInit = function () {
		$ctrl.items = $ctrl.resolve.items;
		$ctrl.selected = {
		  item: $ctrl.items[0]
		};
	  };
  
	  $ctrl.ok = function () {
		$ctrl.close({$value: $ctrl.selected.item});
	  };
  
	  $ctrl.cancel = function () {
		$ctrl.dismiss({$value: 'cancel'});
	  };
	}
  });
App.getAppInstance().controller("reservationController", ['$scope','$rootScope','$timeout','$http','$httpParamSerializer',function ($scope, $rootScope,$timeout,$http,$httpParamSerializer){
   $scope.timesForReservations = ['08-09','09-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20','20-21','21-22','22-23','23-24'];
   $scope.times = ['08:00 a.m.','09:00 a.m.','10:00 a.m.','11:00 a.m.','12:00 m.d','01:00 p.m.','02:00 p.m.','03:00 p.m.','04:00 p.m.','05:00 p.m.','06:00 p.m.','07:00 p.m.','08:00 p.m.','09:00 p.m.','10:00 p.m.','11:00 p.m.'];
	//var path = ( window.location.pathname.replace('/','').replace(/\/$/, '').split('/').length <= 2 ) ? './' : '../';
   $scope.roles = {'Admin':'1','Dependiente':'2'};
   $scope.dailyResevationsActive = false;
   $scope.pitchsContainer = false;

   $rootScope.loadReservations = function (){
		//angular.element('#loading-modal').modal('show');
		   
		//angular.element('#dailyResevations').hide();
		$scope.dailyResevationsActive = false;
   		
	   	/*if( !angular.element('.day div.active').length ){
			angular.element('.day div').first().addClass('active');
			angular.element('.day div').first().parent().addClass('active');
			angular.element('.day div').first().parents('.days_row').addClass('active');
		}
		else{
			angular.element('.day div.active').parent().addClass('active');
			angular.element('.day div.active').parents('.days_row').addClass('active');
		}
		*/

		//Set day as active day
		/*var day = angular.element('.day div.active').text();
		angular.element('#day').val(day);

		var daySelected = angular.element('#calendar .days_row.active .day').index(angular.element('#calendar .days_row.active .day.active'));
						 
		angular.element('#currentDay').html( angular.element('#calendar .days_head .head:eq('+daySelected+')').text() + ' ' +day);
		*/

		var req = {
			method: 'POST',
			url: App.getBaseURL() + "getReservationByDay",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( $scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//$timeout(function(){
				$scope.reservations = $scope.sortReservations(angular.fromJson(response.data));
				console.log($scope.reservations);
			//});
			//console.log('CHRIS');
			//$timeout(function(){
				//angular.element('#loading-modal').modal('hide');
			//});

			//angular.element('#dailyResevations').show();
			$scope.dailyResevationsActive = true;
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.loadPitchsPagination = function (){

		var req = {
			method: 'POST',
			url: App.getBaseURL() + "getPitchByGroup",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( { group: $scope.getGroup() } ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//$timeout(function(){
				$scope.pitchs = angular.fromJson(response.data);
			//});
			$scope.pitchsContainer = true;
			//angular.element('#pitchs').show();
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

		//$scope.pitchValue = angular.element('#pitch').val();
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
		var group;
		var req = {
			method: 'POST',
			url: App.getBaseURL() + "getGroup",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: { group_name: $scope.groupValue /*angular.element('#group').val()*/ || window.location.pathname.replace('/','').replace(/\/$/, '').split('/')[1] },
			async : false,
		 	cache : false
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			group = angular.fromJson(responseData)[0].id;
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

		return group;
	}

	$scope.getPitch = function(){
		return $scope.pitchValue /*angular.element('#pitch').val()*/ || window.location.pathname.replace('/','').replace(/\/$/, '').split('/')[2];
	}

	$rootScope.getDataForTemporaryReservation = function(){
		return { 	reservation_year : $scope.yearValue,//$scope.yearValue, 
					reservation_month : $scope.monthValue, //$scope.monthValue, 
					reservation_day : $scope.dayValue, //$scope.dayValue, 
					group_id : $scope.getGroup(), 
					pitch_id : $scope.getPitch(),
					team_id : $scope.teamIDValue,//angular.element('#team_id').val(),
					reservation_time : $scope.reservationTimeValue,//angular.element('#reservation_time').val(),
					id_user : 0//( angular.element('#id_user').val() ) ? angular.element('#id_user').val() : '0'
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
			url: App.getBaseURL() + "setTemporaryReservationState",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( data ),
		 	cache : false
		}

		$http(req).then(function(response) {},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.getDateFromServer = function(){
		var req = {
			method: 'POST',
			url: App.getBaseURL() + "getDateFromServer",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
			async : false,
		 	cache : false
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			$timeout(function(){
				$scope.dateFromServer = ( !!Date.parse(responseData) ) ? responseData : responseData.replace(/-/g,'/') + ' GMT';
			});
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$rootScope.getRates = function(){
		var req = {
			method: 'POST',
			url: App.getBaseURL() + "getRates",
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
		return  new Date($scope.yearValue,$scope.monthValue - 1,$scope.dayValue,'23','59','59') > new Date($scope.dateFromServer);
	}

	$rootScope.isAdminUser = function(){
		return ( /*!!angular.element('#isAdminUser').val()*/ !!$scope.isAdminUserValue && /admin/.test(location.href) );
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

		data.push([$scope.dayValue,$scope.monthValue,$scope.yearValue]);	
		for(var i = range; i<= daysPerYear ; i++){
			var from = new Date($scope.yearValue,$scope.monthValue - 1,$scope.dayValue);
			var to = new Date($scope.yearValue,$scope.monthValue - 1,$scope.dayValue);
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
		//angular.element('#sending-email-modal').modal('show');
		var req = {
			method: 'POST',
			url: App.getBaseURL() + "sendEmail",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			//angular.element('#sending-email-modal').modal('hide');
			$scope.loadReservations();
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$rootScope.sendSMS = function(data){
		//angular.element('#sending-sms-modal').modal('show');
		var req = {
			method: 'POST',
			url: App.getBaseURL() + "sendSMS",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			//angular.element('#sending-sms-modal').modal('hide');
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
		if( (/admin/.test(location.href) || /reservaciones/.test(location.href)) && !App.getLeavePageConfirmation() ){
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

	$rootScope.onClickParentContainer = function(){
		App.setLeavePageConfirmation(true);
	};
}]);

/*angular.element(document).ready(function(){

	angular.element('#calendar .header').on('mouseenter', function(){
		angular.element('.days_head, .days_row').show();
	});

	angular.element('#currentDate').on('click', function(){
		angular.element('.days_head, .days_row').show();
	});

	angular.element('#calendar').on('mouseleave', function(){
		angular.element('.days_head, .days_row').hide();
	});
});*/

App.getAppInstance().directive('loadDay', ['$document', function($document) {
    return function(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('.day div').removeClass('active');
        angular.element('.day').removeClass('active');
        angular.element('.days_row').removeClass('active');
        angular.element(element).addClass('active');
        angular.element(element).parent().addClass('active');
		angular.element(element).parents('.days_row').addClass('active');
		
		//angular.element('#dailyResevations').hide();
		scope.dailyResevationsActive = false;

        scope.loadReservations();
      });

    };
  }]);


App.getAppInstance().directive('available', ['$document','$http','$timeout','$httpParamSerializer', function($document,$http,$timeout,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        angular.element('#team_id').val(attr.team);
        angular.element('#reservation_time').val(angular.element(element).siblings('.reservation-time').attr('data-time'));

        /* -- Specific Rates -- */
        if( !!scope.rates ){
	        var date = new Date(angular.element('#year').val(),angular.element('#month').val() - 1,angular.element('#day').val()).getDay(),
	        	isWeekend = (date == 6 || date == 0),
	        	hourSelected = scope.getDataForTemporaryReservation().reservation_time.split('-')[0];

	    	for(var i = 0; i < scope.rates.length; i++){
	        	if(scope.rates[i].weekend == isWeekend && parseInt(hourSelected) >= parseInt(scope.rates[i].hora_inicio) && parseInt(hourSelected) <= parseInt(scope.rates[i].hora_final) ){
	        		scope.$root.specificRates = scope.rates[i];
	        		break;
	        	}
	        }
	    }
        /* -- Specific Rates End -- */

        var req = {
			method: 'POST',
			url: App.getBaseURL() + "getTemporaryReservationState",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			var dataResponse = angular.fromJson(response.data);
			var state = 0;
			/*
				States 
				1: Other user is viewing the same cell
				2. Other user is booking the same cell
				3. Register is Expired, so you can book you reservation now
				4. The BD didn't return anything data, so you can book you reservation now.
				5. The reservation already exists
			*/
			state = ( dataResponse.length ) ? dataResponse[0].state : '4';

			switch(state){
				case '1':
					//angular.element('#reservation-watching-by-other-user-modal').modal('show');
				break;
				case '2':
					//angular.element('#reservation-in-use-by-other-user-modal').modal('show');
				break;
				case '3':
				case '4':
					var data = scope.getDataForTemporaryReservation();
					data.state = '1'; 
					scope.setStateTemporaryReservation(data);

					//angular.element('#formReservationModal').modal('show');
					var daySelected = angular.element('#calendar .days_row.active .day').index(angular.element('#calendar .days_row.active .day.active'));
					angular.element('#reservationInfo').html(angular.element('#calendar .days_head .head:eq('+daySelected+')').text() + ' ' + angular.element('#day').val()+'/'+angular.element('#month').val()+'/'+angular.element('#year').val() + ' ' + angular.element(element).siblings('.reservation-time ').text());
					if( scope.isAdminUser() ){
						$timeout(function(){
							angular.element('#bookingOnLine').trigger('click');
							scope.bookingType = 'bookingOnLine';
						});
					}
				break;
				case '5':
					
					//location.reload();
					//angular.element('#formReservationModal').modal('hide');
					//angular.element('#already-reserved-modal').modal('show');
					alert('Esta casilla ya fue reservada. Por favor escoja otra casilla para reservar');
					scope.loadReservations();
					
				break;
			}
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
      });

    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('bookingOnLine', ['$document','$http','$interval','$httpParamSerializer', function($document,$http, $interval,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        var data = scope.getDataForTemporaryReservation();

		var req = {
			method: 'POST',
			url: App.getBaseURL() + "checkIfReservationExist",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			var dataResponse = angular.fromJson(response.data)
			//angular.element('#loading-modal').modal('hide');
			console.log('CHRIS');
			if(dataResponse.length){
				data.state = '5';// Reservada
				scope.setStateTemporaryReservation(data);
				
				//location.reload();
				//angular.element('#formReservationModal').modal('hide');
				//angular.element('#already-reserved-modal').modal('show');
				alert('Esta casilla ya fue reservada. Por favor escoja otra casilla para reservar');
				scope.loadReservations();
				
			}
			else{
				data.state = '2'; 
				scope.setStateTemporaryReservation(data);
			}
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


		var minutes = 9,
			seconds = 60;

		scope.timeInterval = $interval(function(){
			seconds--;
			scope.time = '00:'+minutes+':'+seconds;

			if( minutes == 0 && seconds == 0){
				App.setLeavePageConfirmation(true);
				$interval.cancel(scope.timeInterval);
				location.reload();
			}
			
			if(seconds == 00){
				seconds = 59;
				minutes--;
			}
		},1000);

      });
      scope.time = '00:10:00';
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('reserveBtn', ['$document','$http','$filter','$httpParamSerializer', function($document,$http,$filter,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        if( scope.bookingForm.$valid ){
        	//console.log('valido');

       		var data = scope.getDataForReservation();

			if(!data.setPitchAllWeeks){
				//angular.element('#successful-reserved-modal').modal('show');
				//alert("Su reservación ha sido creada satisfactoriamente");

				var req = {
					method: 'POST',
					url: App.getBaseURL() + "createReservation",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $httpParamSerializer( data ),
				 	cache : false
				}

				$http(req).then(function(response) {
					var dataTmp = scope.getDataForTemporaryReservation();
						dataTmp.state = '5'; 
						scope.setStateTemporaryReservation(dataTmp);

						//location.reload();
						//scope.$parent.successReservation = true;

						//angular.element('#formReservationModal').modal('hide');
						if( !!data.phone){
							scope.sendSMS({	'phone' : data.phone,
												'data_reservation' : 'F5 confirma Reserva:'
												+ ' Nombre: ' + data.name.capitalize() + ' '+ data.lastname.capitalize()
												+ ', Fecha: ' + data.reservation_day +'/'+ data.reservation_month +'/'+ data.reservation_year
												+ ', Hora: ' + scope.getCorrectTimeReservation(data.reservation_time)
												+ ', Árbitro: ' + ( (data.referee_required == 1) ? 'Sí' : "No" )
												+ ', Monto a cancelar(ado): ' + $filter('currency')(( ((scope.fields.typeReservation == '1') ? scope.specificRates.cancha_completa * 1 : scope.specificRates.cancha_completa/2 ) + ( (!!scope.fields.setReferee) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.arbitro * 1 : scope.specificRates.arbitro/2 ) : 0 ) + ( (!!scope.fields.setPitchAllWeeks) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.cancha_fija_completa_deposito * 1 : scope.specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) ),'') + ' colones' 
												+ ' Por favor presentarse 10 minutos antes.'
												+ ( (data.group_id == 1) ? ' Llegar con Google Maps https://goo.gl/itWeJb ó Waze http://waze.to/lr/hd1u0mq3ux' : ' Llegar con Google Maps https://goo.gl/itWeJb ó Waze http://waze.to/lr/hd1u0mq3ux' )
												+ ' Atte: Equipo F5'
												+ ' Teléfonos: 8376-2121 / 7206-3300'
												+ ' www.f5.cr '
												+ ' https://www.facebook.com/f5costarica'
											});
						}
						
						if( !!data.email ){
							scope.sendEmail({	'email' : data.email,
												'data_reservation' : 'Hola!!'
												+ '<br/><br/>'
												+ 'Mediante este correo electrónico te confirmamos la reserva hecha a nombre de: ' + data.name.capitalize() + ' '+ data.lastname.capitalize()
												+ ' en F5 ' + ( (data.group_id == 1) ? 'Escazú' : "Desamparados" ) + '.'
												+ '<br/><br/>'
												+ 'Por favor verificar que hayamos hecho correctamente nuestro trabajo:'
												+ '<br/><br/>'
												+ 'Fecha de la reserva: ' + data.reservation_day +'/'+ data.reservation_month +'/'+ data.reservation_year
												+ '<br/>'
												+ 'Hora de la reserva: ' + scope.getCorrectTimeReservation(data.reservation_time)
												+ '<br/>'
												+ 'Requiere Árbitro: ' + ( (data.referee_required == 1) ? 'Sí' : "No" )
												+ '<br/>'
												+ 'Monto a cancelar(ado): ' + $filter('currency')(( ((scope.fields.typeReservation == '1') ? scope.specificRates.cancha_completa * 1 : scope.specificRates.cancha_completa/2 ) + ( (!!scope.fields.setReferee) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.arbitro * 1 : scope.specificRates.arbitro/2 ) : 0 ) + ( (!!scope.fields.setPitchAllWeeks) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.cancha_fija_completa_deposito * 1 : scope.specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) ),'') + ' colones'
												+ '<br/><br/>'
												+ 'Ya sabes cómo llegar?, te dejamos estos links para que se te haga más fácil encontrarnos!!'
												+ '<br/><br/>'
												+ 'F5 ' + ( (data.group_id == 1) ? 'Escazú, Conducir allí usando <a href="https://www.google.co.cr/maps/place/Futbol+5+Escazu/@9.9228973,-84.1414574,176m/data=!3m1!1e3!4m5!1m2!2m1!1sF5+Escazu!3m1!1s0x0000000000000000:0x7e581f528391695e!6m1!1e1">Google Maps</a>' : 'Desamparados, Conducir allí usando <a href="https://www.google.co.cr/maps/place/Futbol+5+Escazu/@9.9228973,-84.1414574,176m/data=!3m1!1e3!4m5!1m2!2m1!1sF5+Escazu!3m1!1s0x0000000000000000:0x7e581f528391695e!6m1!1e1">Google Maps</a>' )
												+ '<br/><br/>'
												+ 'F5 ' + ( (data.group_id == 1) ? 'Escazú, Conducir allí usando <a href="http://waze.to/lr/hd1u0mq3ux">Waze</a>' : 'Desamparados, Conducir allí usando <a href="http://waze.to/lr/hd1u0mq3ux">Waze</a>' )
												+ '<br/><br/>'
												+ 'De tener cualquier duda llámanos y te ayudaremos a solventarla.'
												+ '<br/><br/><br/>'
												+ 'Atentamente'
												+ '<br/><br/>'
												+ 'Equipo F5'
												+ '<br/>'
												+ 'Teléfonos: 8376-2121 / 7206-3300'
												+ '<br/>'
												+ 'Visítanos en nuestra web <a href="www.f5.cr">www.f5.cr</a>'
												+ '<br/>'
												+ 'Visítanos en nuestro <a href="https://www.facebook.com/f5costarica?fref=ts">Facebook</a>'
												+ '<br/><br/><br/>'
												+ '<img src="f5.cr' + App.getBaseURL() + 'img/logo.png"/>'
											});
						}else{
							//angular.element('#loading-modal').modal('hide');
							scope.loadReservations();
						}

				},function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});				
			}
			else{
				//angular.element('#loading-modal').modal('hide');
				//angular.element('#set-pitch-all-weeks-modal').modal('show');
				var tmp = {
					reservation_day : data.reservation_day,
					reservation_month : data.reservation_month,
					reservation_year : data.reservation_year
				};

				data['dates'] = scope.calculateDayPerWeek();
				var result = new Array();

				for(var i = 0; i < data['dates'].length ; i++){
					result[i] = new Array();
				}


				var req = {
					method: 'POST',
					url: App.getBaseURL() + "reserveAllWeeksSameDay",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $httpParamSerializer( data ),
				 	cache : false
				}

				$http(req).then(function(response) {
					//angular.element('#formReservationModal').modal('hide');
					//angular.element('#set-pitch-all-weeks-modal').modal('hide');
					//scope.loadReservations();

					if( !!data.phone){
						scope.sendSMS({	'phone' : data.phone,
												'data_reservation' : 'F5 confirma Reserva:'
												+ ' Nombre: ' + data.name.capitalize() + ' '+ data.lastname.capitalize()
												+ ', Fecha: ' + data.reservation_day +'/'+ data.reservation_month +'/'+ data.reservation_year
												+ ', Hora: ' + scope.getCorrectTimeReservation(data.reservation_time)
												+ ', Árbitro: ' + ( (data.referee_required == 1) ? 'Sí' : "No" )
												+ ', Monto a cancelar(ado): ' + $filter('currency')(( ((scope.fields.typeReservation == '1') ? scope.specificRates.cancha_completa * 1 : scope.specificRates.cancha_completa/2 ) + ( (!!scope.fields.setReferee) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.arbitro * 1 : scope.specificRates.arbitro/2 ) : 0 ) + ( (!!scope.fields.setPitchAllWeeks) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.cancha_fija_completa_deposito * 1 : scope.specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) ),'') + ' colones' 
												+ ' Por favor presentarse 10 minutos antes.'
												+ ( (data.group_id == 1) ? ' Llegar con Google Maps https://goo.gl/itWeJb ó Waze http://waze.to/lr/hd1u0mq3ux' : ' Llegar con Google Maps https://goo.gl/itWeJb ó Waze http://waze.to/lr/hd1u0mq3ux' )
												+ ' Atte: Equipo F5'
												+ ' Teléfonos: 8376-2121 / 7206-3300'
												+ ' www.f5.cr '
												+ ' https://www.facebook.com/f5costarica'
											});
					}
					if( !!data.email ){
						var daysAvailables = angular.fromJson(response.data);

						for(i = 0; i < data['dates'].length; i++){
							result[i].push(data['dates'][i][0] + '/'+data['dates'][i][1] + '/' +  data['dates'][i][2]);
							result[i].push(daysAvailables[i]); 
						}

						var dates_str = '<br/>';

						for(var i = 0; i < result.length ; i++){
							dates_str += '<tr>';
							dates_str += '<td>'+result[i][0] +'</td>';
							dates_str += (result[i][1]) ? '<td>Reservado correctamente</td>' : '<td>NO Reservado (Ocupado)</td>';
							dates_str += '<tr/>';
						}
						scope.sendEmail({	'email' : data.email,
									'data_reservation' : 'Hola!!'
									+ '<br/><br/>'
									+ 'Mediante este correo electrónico te confirmamos la reserva hecha a nombre de: ' + data.name.capitalize() + ' '+ data.lastname.capitalize()
									+ ' en F5 ' + ( (data.group_id == 1) ? 'Escazú' : "Desamparados" ) + '.'
									+ '<br/><br/>'
									+ 'Por favor verificar que hayamos hecho correctamente nuestro trabajo:'
									+ '<br/><br/>'
									+ 'Fecha de la reserva: ' + data.reservation_day +'/'+ data.reservation_month +'/'+ data.reservation_year
									+ '<br/>'
									+ 'Hora de la reserva: ' + scope.getCorrectTimeReservation(data.reservation_time)
									+ '<br/>'
									+ 'Requiere Árbitro: ' + ( (data.referee_required == 1) ? 'Sí' : "No" )
									+ '<br/>'
									+ 'Monto a cancelar(ado): ' + $filter('currency')(( ((scope.fields.typeReservation == '1') ? scope.specificRates.cancha_completa * 1 : scope.specificRates.cancha_completa/2 ) + ( (!!scope.fields.setReferee) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.arbitro * 1 : scope.specificRates.arbitro/2 ) : 0 ) + ( (!!scope.fields.setPitchAllWeeks) ? ( (scope.fields.typeReservation == '1') ? scope.specificRates.cancha_fija_completa_deposito * 1 : scope.specificRates.cancha_fija_reto_deposito * 1 ) : 0 ) ),'') + ' colones' 
									+ '<br/><br/>'
									+ 'También se ha reservado esta cancha fija las siguientes fechas' + '<table>' + dates_str + '</table>'
									+ '<br/><br/>'
									+ 'Ya sabes cómo llegar?, te dejamos estos links para que se te haga más fácil encontrarnos!!'
									+ '<br/><br/>'
									+ 'F5 ' + ( (data.group_id == 1) ? 'Escazú, Conducir allí usando <a href="https://www.google.co.cr/maps/place/Futbol+5+Escazu/@9.9228973,-84.1414574,176m/data=!3m1!1e3!4m5!1m2!2m1!1sF5+Escazu!3m1!1s0x0000000000000000:0x7e581f528391695e!6m1!1e1">Google Maps</a>' : 'Desamparados, Conducir allí usando <a href="https://www.google.co.cr/maps/place/Futbol+5+Escazu/@9.9228973,-84.1414574,176m/data=!3m1!1e3!4m5!1m2!2m1!1sF5+Escazu!3m1!1s0x0000000000000000:0x7e581f528391695e!6m1!1e1">Google Maps</a>' )
									+ '<br/><br/>'
									+ 'F5 ' + ( (data.group_id == 1) ? 'Escazú, Conducir allí usando <a href="http://waze.to/lr/hd1u0mq3ux">Waze</a>' : 'Desamparados, Conducir allí usando <a href="http://waze.to/lr/hd1u0mq3ux">Waze</a>' )
									+ '<br/><br/>'
									+ 'De tener cualquier duda llámanos y te ayudaremos a solventarla.'
									+ '<br/><br/><br/>'
									+ 'Atentamente'
									+ '<br/><br/>'
									+ 'Equipo F5'
									+ '<br/>'
									+ 'Teléfonos: 8376-2121 / 7206-3300'
									+ '<br/>'
									+ 'Visítanos en nuestra web <a href="www.f5.cr">www.f5.cr</a>'
									+ '<br/>'
									+ 'Visítanos en nuestro <a href="https://www.facebook.com/f5costarica?fref=ts">Facebook</a>'
									+ '<br/><br/><br/>'
									+ '<img src="f5.cr' + App.getBaseURL() + 'img/logo.png"/>'
								});
					}else{
						scope.loadReservations();
					}
		
				},function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}

        }
        else{
        	//console.log('invalido');
        	alert("Por favor ingrese correctamente los datos erróneos en el formulario");
        	//angular.element('#loading-modal').modal('hide');
        }
        
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('showInfo', ['$document','$timeout','$http','$httpParamSerializer', function($document,$timeout,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');

        angular.element('#team_id').val(attr.team);
        angular.element('#reservation_time').val(angular.element(element).siblings('.reservation-time').attr('data-time'));

        var req = {
			method: 'POST',
			url: App.getBaseURL() + "getReservationByTime",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).then(function(response) {
			//angular.element('#loading-modal').modal('hide');
			//$timeout(function(){
				scope.$root.completeInfo = angular.fromJson(response.data)[0];
			//});
			//angular.element('#show-info-modal').modal('show');
	
		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('delete', ['$document','$http','$httpParamSerializer', function($document,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');

        angular.element(element).addClass('active');
        if(confirm("Realmemente desea eliminar este registro?")){
        	var data = scope.getDataForTemporaryReservation();
			data.state = '3'; 
			scope.setStateTemporaryReservation(data);

			if(!scope.fields.deleteAllCccurrences){
	        	var req = {
					method: 'POST',
					url: App.getBaseURL() + "setInactiveReservation",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $httpParamSerializer( data ),
				 	cache : false
				}

				$http(req).then(function(response) {
					//alert('Registro Eliminado');
					//angular.element('#loading-modal').modal('hide');
					scope.loadReservations();
			
				},function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}else{
				//console.log(scope.completeInfo.id_group_all_weeks);
				var req = {
					method: 'POST',
					url: App.getBaseURL() + "setInactiveReservationAllWeeks",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $httpParamSerializer( { id_group_all_weeks: scope.completeInfo.id_group_all_weeks } ),
				 	cache : false
				}

				$http(req).then(function(response) {
					//alert('Registro Eliminado');
					//angular.element('#loading-modal').modal('hide');
					scope.loadReservations();
			
				},function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}
        }
        else{
        	//angular.element('#loading-modal').modal('hide');
        }
        angular.element(element).removeClass('active');

      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('searchBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');

		$http.get(App.getBaseURL() + "getClientsData").
		  success(function(data, status, headers, config) {
		    //angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.clients = angular.fromJson(data);
			//});
			//angular.element('#search-modal').modal('show');
			scope.$parent.selectUserMode = false;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });

      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('selectUserBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        $http.get(App.getBaseURL() + "getClientsData").
		  success(function(data, status, headers, config) {
		    //angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.clients = angular.fromJson(data);
			//});
			//angular.element('#search-modal').modal('show');
			scope.$parent.selectUserMode = true;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('changePasswordBtn', ['$document','$http','$httpParamSerializer', function($document,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        var data = {
        	'user' : scope.fields.userAccountToEdit,
        	'password' : scope.fields.password,
        	'name' : scope.fields.nameAccountToEdit
        }
        if( scope.changePassForm.$valid ){

			var req = {
				method: 'POST',
				url: App.getBaseURL() + "changePassword",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $httpParamSerializer( data ),
			 	cache : false
			}

			$http(req).then(function(response) {
				//angular.element('#loading-modal').modal('hide');
				alert("La cuenta se ha actualizado satisfactoriamente. Nota: Debe deslogearse y volver a logearse con la cuenta moficada para visualizar los cambios");
				//angular.element('#edit-account-modal').modal('hide');
				
				$http.get(App.getBaseURL() + "getAccountsData").then(function(response) {
				 	//$timeout(function(){
						scope.$root.accounts = angular.fromJson(response.data);
					//});
				  },function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
				//App.setLeavePageConfirmation(true);
				//window.location = App.getBaseURL() + 'logout';
		
			},function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
       	}
       	else{
       		alert("Por favor ingrese correctamente los datos erróneos");
       	}
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);


  App.getAppInstance().directive('fillFormClientBtn', ['$document', function($document) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#search-modal').modal('hide');
        //angular.element('#loading-modal').modal('show');
        var rowClient = angular.element('input[name="client"]:checked').parents('.rowClient');
        scope.fields.name = rowClient.find('.clientName').val();
        scope.fields.lastname1 = rowClient.find('.clientLastName').val().split(' ')[0];
        scope.fields.lastname2 = rowClient.find('.clientLastName').val().split(' ')[1];
        scope.fields.email = rowClient.find('.clientEmail').val();
        scope.fields.phone = rowClient.find('.clientPhone').val();
        //angular.element('#loading-modal').modal('hide');
       });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);


  App.getAppInstance().directive('checkAvailabilityBtn', ['$document','$timeout','$http','$httpParamSerializer', function($document,$timeout,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();

       	//angular.element('#loading-modal').modal('show');
		var data = scope.getDataForTemporaryReservation();
			data['dates'] = scope.calculateDayPerWeek();

		var result = new Array();

		for(var i = 0; i < data['dates'].length ; i++){
			result[i] = new Array();
		}

		var req = {
			method: 'POST',
			url: App.getBaseURL() + "checkAvailability",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $httpParamSerializer( data ),
		 	cache : false
		}

		$http(req).then(function(response) {
			var daysAvailables = angular.fromJson(response.data);

			for(i = 0; i < data['dates'].length; i++){
				result[i].push(data['dates'][i][0] + '/'+data['dates'][i][1] + '/' +  data['dates'][i][2]);
				result[i].push(daysAvailables[i]); 
			}
			//$timeout(function(){
				scope.$root.daysAvailables = result;
			//});
			//angular.element('#loading-modal').modal('hide');
			//angular.element('#check-availability-modal').modal('show');

		},function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

       });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('insertCardData', ['$document', function($document) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        if( scope.bookingForm.$valid ){
        	angular.element('#bookingForm').hide();
        	angular.element('#carDataForm').show();
        	scope.fields.stepReservation = 2;
        }
        else{
        	alert("Por favor ingrese correctamente los datos erróneos en el formulario");
        }
        
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('returnToFormReservation', ['$document', function($document) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
    	angular.element('#bookingForm').show();
    	angular.element('#carDataForm').hide();
    	scope.fields.stepReservation = 1;
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('reserveAndPayBtn', ['$document','$http','$timeout','$httpParamSerializer', function($document,$http,$timeout,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        if( scope.carDataForm.$valid ){
        	var data = scope.getDataForReservation();
        	data.number = scope.fields.number;
			data.type = scope.fields.type;
			data.expire_month = scope.fields.expire_month;
			data.expire_year = scope.fields.expire_year;
			data.cvv = scope.fields.cvv;
			data.first_name = scope.fields.name;
			data.last_name = scope.fields.lastname1;

        	//angular.element('#processing-card-modal').modal('show');
        	var req = {
				method: 'POST',
				url: App.getBaseURL() + "acceptCreditCardPayment",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $httpParamSerializer( data ),
			 	cache : false
			}

			$http(req).then(function(response) {
				var dataResponse = response.data;
				//angular.element('#processing-card-modal').modal('hide');
				if( dataResponse.state == "approved" ){
					//angular.element('#formReservationModal').modal('hide');
					$timeout(function(){
							angular.element('#reserveAfterPayBtn').trigger('click');
					});
				}
				else{
					scope.fields.response_error = dataResponse.details;
				}
				
			},function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
        }
        else{
        	alert("Por favor ingrese correctamente los datos erróneos en el formulario");
        }
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('modifyAccountsBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');
        $http.get(App.getBaseURL() + "getAccountsData").
		  success(function(data, status, headers, config) {
		    //angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.accounts = angular.fromJson(data);
			//});
			//angular.element('#show-accounts-modal').modal('show');
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('editAccountBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#edit-account-modal').modal('show');
        //console.log(attr.value);
        $timeout(function(){
        	scope.fields.nameAccountToEdit = attr.accountnametoedit;
        	scope.fields.userAccountToEdit = attr.usertoedit;
        });
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

  App.getAppInstance().directive('updateRatesBtn', ['$document','$http','$httpParamSerializer', function($document,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');

        var updatedRates = [];
		angular.element('form[name="changeRatesForm"] tr.rates').each(function(){
		    updatedRates.push({	'id': angular.element(this).attr('id'), 
								'cancha_completa' : angular.element(this).find('.cancha_completa').val(),
								'arbitro' : angular.element(this).find('.arbitro').val(),
								'cancha_fija_completa' : angular.element(this).find('.cancha_fija_completa').val(),
								'cancha_fija_reto' : angular.element(this).find('.cancha_fija_reto').val()
			});
		});

        if( scope.changeRatesForm.$valid ){

			var req = {
				method: 'POST',
				url: App.getBaseURL() + "changeRates",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data:  $httpParamSerializer({updatedRates : angular.toJson(updatedRates)}),
			 	cache : false
			}

			$http(req).then(function(response) {
				//angular.element('#loading-modal').modal('hide');
				alert("Las tarifas han sido actualizados");
				//angular.element('#edit-rates-modal').modal('hide');
				scope.getRates();
		
			},function(responseg) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});

       	}
       	else{
       		alert("Por favor ingrese correctamente los datos erróneos");
       	}
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

App.getAppInstance().directive('saveBookingEdited', ['$document','$http','$httpParamSerializer', function($document,$http,$httpParamSerializer) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        //angular.element('#loading-modal').modal('show');

		if(!scope.fields.editAllCccurrences){
        	var req = {
				method: 'POST',
				url: App.getBaseURL() + "updateResevation",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $httpParamSerializer(scope.completeInfo),
			 	cache : false
			}

			$http(req).then(function(response) {
				//alert('Registro Eliminado');
				//angular.element('#loading-modal').modal('hide');
				scope.loadReservations();
		
			},function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		}else{
			var req = {
				method: 'POST',
				url: App.getBaseURL() + "updateReservationAllWeeks",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $httpParamSerializer(scope.completeInfo),
			 	cache : false
			}

			$http(req).then(function(response) {
				//alert('Registro Eliminado');
				//angular.element('#loading-modal').modal('hide');
				scope.loadReservations();
		
			},function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		}

      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);
