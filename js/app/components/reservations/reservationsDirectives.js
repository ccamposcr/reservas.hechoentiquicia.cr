F5App.app.directive('loadDay', ['$document', function($document) {
    return function(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('.day div').removeClass('active');
        angular.element('.day').removeClass('active');
        angular.element('.days_row').removeClass('active');
        angular.element(element).addClass('active');
        angular.element(element).parent().addClass('active');
        angular.element(element).parents('.days_row').addClass('active');
        angular.element('#dailyResevations').hide();
        scope.loadReservations();
      });

    };
  }]);


F5App.app.directive('available', ['$document','$http','$timeout', function($document,$http,$timeout) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
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
			url: F5App.base_url + "getTemporaryReservationState",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).success(function(response, status, headers, config) {
			angular.element('#loading-modal').modal('hide');
			var response = angular.fromJson(response);
			var state = 0;
			/*
				States 
				1: Other user is viewing the same cell
				2. Other user is booking the same cell
				3. Register is Expired, so you can book you reservation now
				4. The BD didn't return anything data, so you can book you reservation now.
				5. The reservation already exists
			*/

			state = ( response.length == 0 ) ? '4' : response[0].state;

			switch(state){
				case '1':
					angular.element('#reservation-watching-by-other-user-modal').modal('show');
				break;
				case '2':
					angular.element('#reservation-in-use-by-other-user-modal').modal('show');
				break;
				case '3':
				case '4':
					var data = scope.getDataForTemporaryReservation();
					data.state = '1'; 
					scope.setStateTemporaryReservation(data);

					angular.element('#formReservationModal').modal('show');
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
					angular.element('#formReservationModal').modal('hide');
					//angular.element('#already-reserved-modal').modal('show');
					alert('Esta casilla ya fue reservada. Por favor escoja otra casilla para reservar');
					scope.loadReservations();
					
				break;
			}
	
		}).error(function(response, status, headers, config) {
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

F5App.app.directive('bookingOnLine', ['$document','$http','$interval', function($document,$http, $interval) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
        var data = scope.getDataForTemporaryReservation();

		var req = {
			method: 'POST',
			url: F5App.base_url + "checkIfReservationExist",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( data ),
		 	cache : false
		}

		$http(req).success(function(response, status, headers, config) {
			angular.element('#loading-modal').modal('hide');
			if(angular.fromJson(response).length > 0){
				data.state = '5';// Reservada
				scope.setStateTemporaryReservation(data);
				
				//location.reload();
				angular.element('#formReservationModal').modal('hide');
				//angular.element('#already-reserved-modal').modal('show');
				alert('Esta casilla ya fue reservada. Por favor escoja otra casilla para reservar');
				scope.loadReservations();
				
			}
			else{
				data.state = '2'; 
				scope.setStateTemporaryReservation(data);
			}
	
		}).error(function(response, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


		var minutes = 9,
			seconds = 60;

		scope.timeInterval = $interval(function(){
			seconds--;
			scope.time = '00:'+minutes+':'+seconds;

			if( minutes == 0 && seconds == 0){
				F5App.leaveSafelyPage = true;
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

F5App.app.directive('reserveBtn', ['$document','$http','$filter', function($document,$http,$filter) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
        if( scope.bookingForm.$valid ){
        	//console.log('valido');

       		var data = scope.getDataForReservation();

			if(!data.setPitchAllWeeks){
				//angular.element('#successful-reserved-modal').modal('show');
				//alert("Su reservación ha sido creada satisfactoriamente");

				var req = {
					method: 'POST',
					url: F5App.base_url + "createReservation",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $.param( data ),
				 	cache : false
				}

				$http(req).success(function(response, status, headers, config) {
					var dataTmp = scope.getDataForTemporaryReservation();
						dataTmp.state = '5'; 
						scope.setStateTemporaryReservation(dataTmp);

						//location.reload();
						//scope.$parent.successReservation = true;

						angular.element('#formReservationModal').modal('hide');
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
												+ '<img src="f5.cr' + F5App.base_url + 'img/logo.png"/>'
											});
						}else{
							angular.element('#loading-modal').modal('hide');
							scope.loadReservations();
						}

				}).error(function(response, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});				
			}
			else{
				angular.element('#loading-modal').modal('hide');
				angular.element('#set-pitch-all-weeks-modal').modal('show');
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
					url: F5App.base_url + "reserveAllWeeksSameDay",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $.param( data ),
				 	cache : false
				}

				$http(req).success(function(response, status, headers, config) {
					angular.element('#formReservationModal').modal('hide');
					angular.element('#set-pitch-all-weeks-modal').modal('hide');
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
						var daysAvailables = angular.fromJson(response);

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
									+ '<img src="f5.cr' + F5App.base_url + 'img/logo.png"/>'
								});
					}else{
						scope.loadReservations();
					}
		
				}).error(function(response, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}

        }
        else{
        	//console.log('invalido');
        	alert("Por favor ingrese correctamente los datos erróneos en el formulario");
        	angular.element('#loading-modal').modal('hide');
        }
        
      });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);

F5App.app.directive('showInfo', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');

        angular.element('#team_id').val(attr.team);
        angular.element('#reservation_time').val(angular.element(element).siblings('.reservation-time').attr('data-time'));

        var req = {
			method: 'POST',
			url: F5App.base_url + "getReservationByTime",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( scope.getDataForTemporaryReservation() ),
		 	cache : false
		}

		$http(req).success(function(response, status, headers, config) {
			angular.element('#loading-modal').modal('hide');
			//$timeout(function(){
				scope.$root.completeInfo = angular.fromJson(response)[0];
			//});
			angular.element('#show-info-modal').modal('show');
	
		}).error(function(response, status, headers, config) {
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

F5App.app.directive('delete', ['$document','$http', function($document,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');

        angular.element(element).addClass('active');
        if(confirm("Realmemente desea eliminar este registro?")){
        	var data = scope.getDataForTemporaryReservation();
			data.state = '3'; 
			scope.setStateTemporaryReservation(data);

			if(!scope.fields.deleteAllCccurrences){
	        	var req = {
					method: 'POST',
					url: F5App.base_url + "setInactiveReservation",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $.param( data ),
				 	cache : false
				}

				$http(req).success(function(response, status, headers, config) {
					//alert('Registro Eliminado');
					angular.element('#loading-modal').modal('hide');
					scope.loadReservations();
			
				}).error(function(response, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}else{
				//console.log(scope.completeInfo.id_group_all_weeks);
				var req = {
					method: 'POST',
					url: F5App.base_url + "setInactiveReservationAllWeeks",
					headers: {
					   	'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: $.param( { id_group_all_weeks: scope.completeInfo.id_group_all_weeks } ),
				 	cache : false
				}

				$http(req).success(function(response, status, headers, config) {
					//alert('Registro Eliminado');
					angular.element('#loading-modal').modal('hide');
					scope.loadReservations();
			
				}).error(function(response, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}
        }
        else{
        	angular.element('#loading-modal').modal('hide');
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

  F5App.app.directive('searchBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');

		$http.get(F5App.base_url + "getClientsData").
		  success(function(data, status, headers, config) {
		    angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.clients = angular.fromJson(data);
			//});
			angular.element('#search-modal').modal('show');
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

  F5App.app.directive('selectUserBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
        $http.get(F5App.base_url + "getClientsData").
		  success(function(data, status, headers, config) {
		    angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.clients = angular.fromJson(data);
			//});
			angular.element('#search-modal').modal('show');
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

  F5App.app.directive('changePasswordBtn', ['$document','$http', function($document,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
        var data = {
        	'user' : scope.fields.userAccountToEdit,
        	'password' : scope.fields.password,
        	'name' : scope.fields.nameAccountToEdit
        }
        if( scope.changePassForm.$valid ){

			var req = {
				method: 'POST',
				url: F5App.base_url + "changePassword",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $.param( data ),
			 	cache : false
			}

			$http(req).success(function(response, status, headers, config) {
				angular.element('#loading-modal').modal('hide');
				alert("La cuenta se ha actualizado satisfactoriamente. Nota: Debe deslogearse y volver a logearse con la cuenta moficada para visualizar los cambios");
				angular.element('#edit-account-modal').modal('hide');
				
				$http.get(F5App.base_url + "getAccountsData").
				  success(function(data, status, headers, config) {
				 	//$timeout(function(){
						scope.$root.accounts = angular.fromJson(data);
					//});
				  }).
				  error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
				//F5App.leaveSafelyPage = true;
				//window.location = F5App.base_url + 'logout';
		
			}).error(function(response, status, headers, config) {
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


  F5App.app.directive('fillFormClientBtn', ['$document', function($document) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#search-modal').modal('hide');
        angular.element('#loading-modal').modal('show');
        var rowClient = angular.element('input[name="client"]:checked').parents('.rowClient');
        scope.fields.name = rowClient.find('.clientName').val();
        scope.fields.lastname1 = rowClient.find('.clientLastName').val().split(' ')[0];
        scope.fields.lastname2 = rowClient.find('.clientLastName').val().split(' ')[1];
        scope.fields.email = rowClient.find('.clientEmail').val();
        scope.fields.phone = rowClient.find('.clientPhone').val();
        angular.element('#loading-modal').modal('hide');
       });
    }
    return {
    	restrict : 'C',
    	scope : false,
    	link:link
	}
  }]);


  F5App.app.directive('checkAvailabilityBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();

       	angular.element('#loading-modal').modal('show');
		var data = scope.getDataForTemporaryReservation();
			data['dates'] = scope.calculateDayPerWeek();

		var result = new Array();

		for(var i = 0; i < data['dates'].length ; i++){
			result[i] = new Array();
		}

		var req = {
			method: 'POST',
			url: F5App.base_url + "checkAvailability",
			headers: {
			   	'Content-Type': 'application/x-www-form-urlencoded'
			},
		 	data: $.param( data ),
		 	cache : false
		}

		$http(req).success(function(response, status, headers, config) {
			var daysAvailables = angular.fromJson(response);

			for(i = 0; i < data['dates'].length; i++){
				result[i].push(data['dates'][i][0] + '/'+data['dates'][i][1] + '/' +  data['dates'][i][2]);
				result[i].push(daysAvailables[i]); 
			}
			//$timeout(function(){
				scope.$root.daysAvailables = result;
			//});
			angular.element('#loading-modal').modal('hide');
			angular.element('#check-availability-modal').modal('show');

		}).error(function(response, status, headers, config) {
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

F5App.app.directive('insertCardData', ['$document', function($document) {
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

F5App.app.directive('returnToFormReservation', ['$document', function($document) {
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

F5App.app.directive('reserveAndPayBtn', ['$document','$http','$timeout', function($document,$http,$timeout) {
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

        	angular.element('#processing-card-modal').modal('show');
        	var req = {
				method: 'POST',
				url: F5App.base_url + "acceptCreditCardPayment",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $.param( data ),
			 	cache : false
			}

			$http(req).success(function(response, status, headers, config) {
				angular.element('#processing-card-modal').modal('hide');
				console.log(response);
				if( response.state == "approved" ){
					angular.element('#formReservationModal').modal('hide');
					$timeout(function(){
							angular.element('#reserveAfterPayBtn').trigger('click');
					});
				}
				else{
					scope.fields.response_error = response.details;
				}
				
			}).error(function(response, status, headers, config) {
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

  F5App.app.directive('modifyAccountsBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');
        $http.get(F5App.base_url + "getAccountsData").
		  success(function(data, status, headers, config) {
		    angular.element('#loading-modal').modal('hide');
		 	//$timeout(function(){
				scope.$root.accounts = angular.fromJson(data);
			//});
			angular.element('#show-accounts-modal').modal('show');
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

  F5App.app.directive('editAccountBtn', ['$document','$timeout','$http', function($document,$timeout,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#edit-account-modal').modal('show');
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

  F5App.app.directive('updateRatesBtn', ['$document','$http', function($document,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');

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
				url: F5App.base_url + "changeRates",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data:  $.param({updatedRates : angular.toJson(updatedRates)}),
			 	cache : false
			}

			$http(req).success(function(response, status, headers, config) {
				angular.element('#loading-modal').modal('hide');
				alert("Las tarifas han sido actualizados");
				angular.element('#edit-rates-modal').modal('hide');
				scope.getRates();
		
			}).error(function(response, status, headers, config) {
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

F5App.app.directive('saveBookingEdited', ['$document','$http', function($document,$http) {
    function link(scope, element, attr) {
      element.on('click', function(event) {
        event.preventDefault();
        angular.element('#loading-modal').modal('show');

		if(!scope.fields.editAllCccurrences){
        	var req = {
				method: 'POST',
				url: F5App.base_url + "updateResevation",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $.param(scope.completeInfo),
			 	cache : false
			}

			$http(req).success(function(response, status, headers, config) {
				//alert('Registro Eliminado');
				angular.element('#loading-modal').modal('hide');
				scope.loadReservations();
		
			}).error(function(response, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		}else{
			var req = {
				method: 'POST',
				url: F5App.base_url + "updateReservationAllWeeks",
				headers: {
				   	'Content-Type': 'application/x-www-form-urlencoded'
				},
			 	data: $.param(scope.completeInfo),
			 	cache : false
			}

			$http(req).success(function(response, status, headers, config) {
				//alert('Registro Eliminado');
				angular.element('#loading-modal').modal('hide');
				scope.loadReservations();
		
			}).error(function(response, status, headers, config) {
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
