/**
 * Created by Imdadul Huq on 28-Sep-15.
 */


myApp.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$ionicPopup) {

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
        if($localStorage.accessToken){
            $location.path("/home");
        }
        else
            $cordovaOauth.facebook("884166234964491", ["email", "public_profile", "user_friends"]).then(function(result) {
                $localStorage.accessToken = result.access_token;
                show(result.access_token);
                //$location.path("/home");
            }, function(error) {
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
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
                $localStorage.oauthToken = result.oauth_token;
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