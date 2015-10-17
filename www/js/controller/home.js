/**
 * Created by Imdadul Huq on 08-Aug-15.
 */


myApp.controller('HomeTabCtrl', function($scope,$state,$ionicPopover,$timeout,Api,$localStorage) {

    var currentProductIDs=[];
    $scope.products = [];

    $scope.loadMore = function() {
        if($scope.products == undefined) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        else
            Api.getLatestProducts({currentShown:currentProductIDs}).then(function(res){
                var moreItem = res.data;
                moreItem.forEach(function (i) {
                    $scope.products.push(i);
                    currentProductIDs.push(i._id);
                })
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },function(err){
            });
    };

    $scope.likeOrUnlike = function(p){
        if($localStorage.accessToken == undefined) return;
        if(p.liked) {
            deleteFromFavourite(p);
        }
        else{
            addToFavorite(p);
        }
    }

    $scope.UrlWithHttp = function(imageurl){
        if(imageurl.indexOf('http://')==-1 && imageurl.indexOf('https://')==-1) imageurl='http://'+imageurl;
        return imageurl;
    }

    var addToFavorite = function(p){
        Api.addToFavorite({productUrl: p.url}).then(function(){
            p.liked = true;
        })
    }

    var deleteFromFavourite = function(p){
        Api.deleteFromFavourite({productUrl: p.url}).then(function(){
            p.liked = false;
        })
    }
});
