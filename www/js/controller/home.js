/**
 * Created by Imdadul Huq on 08-Aug-15.
 */


myApp.controller('HomeTabCtrl', function($scope,$state,$ionicPopover,$timeout,Api) {

    var currentProductIDs=[];
    var getCurrentProductIDs = function(){
        $scope.products.forEach(function(i){
            currentProductIDs.push(i._id);
        })
        return currentProductIDs;
    }
    Api.getLatestProducts({}).then(function(res){
        $scope.products = res.data;
    },function(err){
    })

    $scope.loadMore = function() {
        if($scope.products == undefined) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        else
            Api.getLatestProducts({currentShown:getCurrentProductIDs()}).then(function(res){
                var moreItem = res.data;
                moreItem.forEach(function (i) {
                    $scope.products.push(i);
                })
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },function(err){
            });
    };
});
