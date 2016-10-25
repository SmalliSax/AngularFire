myApp.controller('RegistrationController', 
	['$scope', 'Authentication', 
	function($scope, Authentication){

	$scope.login = function(){
		Authentication.login($scope.user);
	}; // login

	$scope.facebookLogin = function(){
		Authentication.facebookLogin();
	}; // facebook login

	$scope.logout = function(){
		Authentication.logout();
	}; // logout

	$scope.register = function(){
		Authentication.register($scope.user);
       };

    }]);
