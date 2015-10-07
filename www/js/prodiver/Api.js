/**
 * Created by usert on 29-Sep-15.
 */

myApp.service('Api', ['$http', function ($http) {
    //var baseUrl='http://localhost:3001/';
    var baseUrl='https://boiling-lowlands-2147.herokuapp.com/';
    var getFullUrl= function(url){
        return baseUrl+url;
    }
    this.getLatestProducts=function(data){
        var url = 'getLatestProducts'
        return $http({method: 'POST',data:data, url: getFullUrl(url)});
    }
}]);