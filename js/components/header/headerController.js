App.getAppInstance().controller("headerController", ['$scope','$rootScope',function ($scope, $rootScope){

   $scope.setActive = function (){
   		if( !!window.location.href.match('reservaciones') || !!window.location.href.match('admin')){
   			angular.element('#mainNav .reservaciones').addClass('active');
   		}
   		else if ( !!window.location.href.match('galeria') ){
   			angular.element('#mainNav .galeria').addClass('active');
   		}
   		else{
   			angular.element('#mainNav .home').addClass('active');
   		}
   };

}]);