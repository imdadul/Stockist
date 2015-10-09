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
        data.oauthID = $localStorage.accessToken;
        var url = 'getLatestProducts'
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.addToFavorite = function(data){
        data.oauthID = $localStorage.accessToken;
        var url = 'addToFavorite';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.deleteFromFavourite = function(data){
        data.oauthID = $localStorage.accessToken;
        var url = 'deleteFromFavourite';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
    this.onLogin = function(data){
        var url = 'onLogin';
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
}]);