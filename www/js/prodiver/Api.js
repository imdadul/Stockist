/**
 * Created by Imdadul Huq on 29-Sep-15.
 */

myApp.service('Api', ['$http','$localStorage', function ($http,$localStorage) {
    $http.defaults.withCredentials = true;
    var baseUrl='https://boiling-lowlands-2147.herokuapp.com/';
    //var baseUrl='http://localhost:3001/';

    var getFullUrl= function(url){
        return baseUrl+url;
    }
    this.getLatestProducts=function(data){
       // if($localStorage.userInfo == undefined )
        data.oauthID =$localStorage.userInfo != undefined?$localStorage.userInfo.userID:1;
        var url = 'getLatestProducts'
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.addToFavorite = function(data){
        data.oauthID = $localStorage.userInfo.userID;
        var url = 'addToFavorite';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.deleteFromFavourite = function(data){
        data.oauthID = $localStorage.userInfo.userID;
        var url = 'deleteFromFavourite';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.onLogin = function(data){
        var url = 'onLogin';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.getFbUserID = function(access_token){
        // id is provided automatically
        return $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,email", format: "json" }});
    }

    this.getGoogleUserID = function(access_token){
        return $http.get('https://www.googleapis.com/userinfo/v2/me?access_token='+access_token)
    }
}]);