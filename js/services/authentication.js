myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', function($rootScope, $firebaseAuth, $firebaseObject, $location) {

    var Auth = $firebaseAuth();
    var user = firebase.auth().currentUser;
    //Regular instance of authentication

    var provider = new firebase.auth.FacebookAuthProvider();
    //Facebook authentication

    provider.setCustomParameters({
        'display': 'popup'
    });

    $rootScope.date = new Date();

    firebase.auth().onAuthStateChanged(function(user) {
    	//Watch if user is authenticated or not
        if (user) {
            // User is signed in.
            var userRef = firebase.database().ref('users/' + user.uid);
            var userObj = $firebaseObject(userRef);
            console.log(userObj);
            $rootScope.currentUser = userObj;
            console.log("User is signed in");
        } else {
            // No user is signed in.
            $rootScope.currentUser = '';
            console.log("No user is signed in");
        }
    });


    var myObject = {
        login: function(user) {
            Auth.$signInWithEmailAndPassword(user.email, user.password).
            then(function(firebaseUser) {
                $location.path('/success');
            }).
            catch(function(error) {
                //Handle errors
                $rootScope.message = error.message;
            })
        },

        facebookLogin: function() {

            firebase.auth().signInWithPopup(provider).then(function(result) {

                var token = result.credential.accessToken;
                var user = result.user;

            }).catch(function(error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                var email = error.email;

                var credential = error.credential;

            });
        },

        logout: function() {
            return firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }, function(error) {
                $rootScope.message = error.message;
            });
        }, //Logout

        requireAuth: function() {
            return Auth.$requireSignIn();
        }, //require Authentication

        register: function(user) {
            Auth.$createUserWithEmailAndPassword(user.email, user.password)
                .then(function(firebaseUser) {

                    firebase.database().ref('users/').child(firebaseUser.uid).set({
                        date: firebase.database.ServerValue.TIMESTAMP,
                        firebaseUser: firebaseUser.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }); // storing user info

                    myObject.login(user);

                }).catch(function(error) {
                    $rootScope.message = error.message;
                });
        }
    };
    return myObject;
}]);