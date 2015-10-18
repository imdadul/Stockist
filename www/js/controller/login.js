/**
 * Created by Imdadul Huq on 28-Sep-15.
 */


myApp.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$ionicPopup,Api,$http) {

    var show =function(res){
        var myPopup = $ionicPopup.show({
            template: '<div>'+res+'</div>',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }

    $scope.fbLogin = function() {
        if($localStorage.userInfo && $localStorage.userInfo.userID && $localStorage.userInfo.provider=='Facebook'){
            $location.path("/home");
        }
        else {
            $cordovaOauth.facebook("884166234964491", ["email", "public_profile"]).then(function(result) {
                $localStorage.accessToken = result.access_token;
                Api.getFbUserID($localStorage.accessToken).then(function(res){
                    $localStorage.userInfo = {};
                    $localStorage.userInfo.userID = res.data.id;
                    $localStorage.userInfo.provider = 'Facebook';
                    $localStorage.userInfo.email = res.data.email;
                    $localStorage.userInfo.name = res.data.name;
                    if($localStorage.userInfo.userID){
                        $location.path("/home");
                    }
                });
            }, function(error) {
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            });
        }
    };

    $scope.googleLogin = function() {
        if($localStorage.userInfo && $localStorage.userInfo.userID && $localStorage.userInfo.provider=='Google'){
            $location.path("/home");
        }
        else
            $cordovaOauth.google("176339995166-fj3ob29suljn5vq6nmssr7nc4hk6t5o6.apps.googleusercontent.com", ["email","profile"],{redirect_uri:'http://localhost:8100/login'}).then(function(result) {
                $localStorage.accessToken = result.access_token;
                Api.getGoogleUserID($localStorage.accessToken).then(function(res){
                    $localStorage.userInfo.userID = res.data.id;
                    $localStorage.userInfo.provider = 'Google';
                    $localStorage.userInfo.email = res.data.email;
                    $localStorage.userInfo.name = res.data.name;
                    if($localStorage.userInfo.userID){
                        $location.path("/home");
                    }
                });
            }, function(error) {
                console.log("Error -> " + error);
            });
    };

    $scope.twitterLogin = function(){
        // http://blog.ionic.io/displaying-the-twitter-feed-within-your-ionic-app/
        if($localStorage.oauthToken){
            $location.path("/home");
        }
        else {
            try{
            $cordovaOauth.twitter("K0vruTpXWLebnNPMNWBYfp14S", "tMZl5WeYUEWYj6doqwhr0XGbzgAeF2vmVpL7hNERHXod9aFwM1").then(function (result) {
                $localStorage.accessToken = result.oauth_token;
                show(result.oauth_token);
                //$location.path("/home");
            }, function (error) {
                alert(JSON.stringify(error));
                console.log(error);
            });
            }
            catch(error){
                show(error);
            }
        }
    };
});