//App.getAppInstance().controller("modalController", ['$scope','$rootScope','$interval','$timeout', function ($scope, $rootScope,$interval, $timeout){
	App.getAppInstance().controller("modalController", ['$scope','$rootScope','$uibModal','$log','$document', function ($scope, $rootScope,$uibModal,$log,$document){
		var $modalCtrl = this;
		$modalCtrl.items = ['item1', 'item2', 'item3'];

		$modalCtrl.animationsEnabled = true;
	  
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