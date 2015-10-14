// Ionic stockist App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'stockist' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('stockist', ['ionic', 'ngStorage', 'ngCordova'])

myApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sidemenu', {
            url: '',
            abstract: true,
            templateUrl: "templates/side-menu.html",
            controller: 'SideMenu'
        })
        .state('sidemenu.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
        })
        .state('feed', {
            url: '/feed',
            templateUrl: 'templates/feed.html',
            controller: 'FeedController'
        });
    $urlRouterProvider.otherwise('/login');
});


myApp.controller("ProfileController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

});

myApp.controller("FeedController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me/feed", { params: { access_token: $localStorage.accessToken, format: "json" }}).then(function(result) {
                $scope.feedData = result.data.data;
                $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
                    $scope.feedData.myPicture = result.data.picture.data.url;
                });
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

});

myApp.controller('MainController', function($scope,$ionicPlatform,$cordovaDevice) {
    //$scope.platform = $cordovaDevice.getPlatform();
    //$scope.platform = 'iOS';
    document.body.classList.add('platform-iOS');

    $ionicPlatform.ready(function() {
        $scope.platform = $cordovaDevice.getPlatform();
        //$scope.platform = 'android';
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        if($scope.platform=='iOS'){
            document.body.classList.add('platform-ios');
        }
        else{
            document.body.classList.add('platform-android');
        }
    });
});
