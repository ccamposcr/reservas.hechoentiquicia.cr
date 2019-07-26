App.getAppInstance().controller("headerController", ['$scope',function ($scope){
    $scope.setActive = function (){
		var location = window.location.pathname;
		$scope.menuOptionActive = location;
    };
}]);