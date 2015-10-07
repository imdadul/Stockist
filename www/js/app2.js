/**
 * Created by Imdadul Huq on 08-Aug-15.
 */

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//ngular.module('starter', ['ionic'])

//run(function($ionicPlatform) {
// $ionicPlatform.ready(function() {
//   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//   // for form inputs)
//   if(window.cordova && window.cordova.plugins.Keyboard) {
//     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//   }
//   if(window.StatusBar) {
//     StatusBar.styleDefault();
//   }
// });
//)



var myApp=angular.module('stockist', ['ionic','ngStorage','ngMessages','ngCordova']);
myApp
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('sidemenu', {
                url: '',
                abstract: true,
                templateUrl: "html/Account/side-menu.html",
                controller: 'SideMenu'
            })
            .state('sidemenu.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/home.html',
                        controller: 'HomeTabCtrl'
                    }
                }
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'html/Account/forgot-password.html'
            })
            .state('sidemenu.tabs', {
                url: '/tab',
                views: {
                    'menuContent' :{
                        templateUrl: "html/Account/tabs.html"
                    }
                }
            })
            .state('sidemenu.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/home.html',
                        controller: 'HomeTabCtrl'
                    }
                }
            })
            .state('sidemenu.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/search.html',
                        controller: 'Search'
                    }
                }
            })
            .state('sidemenu.addListing', {
                url: '/add_listing',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Listing/Add-listing.html',
                        controller: 'AddListing'
                    }
                }
            })
            .state('sidemenu.friends', {
                url: '/friends',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/Friends.html',
                        controller: 'Friends'
                    }
                }
            }).state('sidemenu.message', {
                url: '/message',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/Message.html',
                        controller: 'Message'
                    }
                }
            })
            .state('sidemenu.myListing', {
                url: '/my_listing',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Listing/My-listing.html',
                        controller: 'MyListing'
                    }
                }
            })
            .state('sidemenu.savedListing', {
                url: '/saved_listing',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Listing/Saved-listing.html',
                        controller: 'SavedListing'
                    }
                }
            })
            .state('sidemenu.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'html/Account/Profile.html',
                        controller: 'Profile'
                    }
                }
            })
            .state('sidemenu.tabs.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'html/misc/about.html'
                    }
                }
            })
            .state('sidemenu.tabs.contact', {
                url: '/contact',
                views: {
                    'contact-tab': {
                        templateUrl: 'html/Account/contact.html'
                    }
                }
            });


        $urlRouterProvider.otherwise('/sign-in');

    })

    .controller('MainController', function($scope,$ionicPlatform,$cordovaDevice) {
        //$scope.platform = $cordovaDevice.getPlatform();
        //$scope.platform = 'iOS';
        document.body.classList.add('platform-android');
        $ionicPlatform.ready(function() {
            $scope.platform = $cordovaDevice.getPlatform();
            //document.body.classList.remove('platform-ios');
            //document.body.classList.remove('platform-android');
            //if($scope.platform=='iOS'){
            //    document.body.classList.add('platform-ios');
            //}
            //else{
            //    document.body.classList.add('platform-android');
            //}
        });
    });


myApp.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("884166234964491", ["email", "public_profile", "user_friends"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/home");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

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