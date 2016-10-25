myApp.controller('SuccessController', ['$scope', function($scope){
	$scope.message = "Here you can edit your profile before continuing";

	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid;
	console.log(user.uid);

	if (user != null) {
  		name = user.displayName;
  		email = user.email;
  		photoUrl = user.photoURL;
  		uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
        
}

}]);