/**
 * Created by usert on 29-Sep-15.
 */

myApp.service('Api', ['$http','$localStorage', function ($http,$localStorage) {
    $http.defaults.withCredentials = true;
    var baseUrl='https://boiling-lowlands-2147.herokuapp.com/';
    //var baseUrl='http://localhost:3001/';

    var getFullUrl= function(url){
        return baseUrl+url;
    }
    this.getLatestProducts=function(data){
        data.oauthID = $localStorage.userID;
        var url = 'getLatestProducts'
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.addToFavorite = function(data){
        data.oauthID = $localStorage.userID;
        var url = 'addToFavorite';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.deleteFromFavourite = function(data){
        data.oauthID = $localStorage.userID;
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
}]);