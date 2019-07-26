App.getAppInstance().controller("headerController", ['$scope',function ($scope){
    $scope.setActive = function (){
		var location = window.location.href;
   		if( location.match('reservaciones') || location.match('admin')){
			$scope.menuOptionActive = 1;
   		}
   		else{
			$scope.menuOptionActive = 0;
   		}
    };
}]);