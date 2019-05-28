F5App.app.controller("galleryController", ['$scope','$rootScope', function ($scope, $rootScope){

   $scope.loadGallery = function (){
   	var album = ( arguments.length != 0 ) ? arguments[0] : '#album1' 

		angular.element(album).find('.carousel').each(function(){
			angular.element(this).flexslider({
			    animation: "slide",
			    controlNav: false,
			    animationLoop: true,
			    slideshow: false,
			    itemWidth: 150,
			    itemMargin: 5,
		    	asNavFor: angular.element(this).siblings('.slider')
			});
		});
		   
		angular.element(album).find('.slider').each(function(){
			angular.element(this).flexslider({
			    animation: "slide",
			    controlNav: false,
			    animationLoop: true,
			    slideshow: true,
			    sync: angular.element(this).siblings('.carousel')
			});
		});

	  	angular.element('.nav-tabs li[role=album] a').click(function (e) {
		  	e.preventDefault();
		  	angular.element(this).tab('show');
		});

   };

}]);