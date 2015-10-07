/**
 * Created by Imdadul Huq on 08-Aug-15.
 */


myApp.controller('HomeTabCtrl', function($scope,$state,$ionicPopover,$timeout,Api) {

    var currentProductIDs=[];
    $scope.products = [];
    //var getCurrentProductIDs = function(){
    //    $scope.products.forEach(function(i){
    //        currentProductIDs.push(i._id);
    //    })
    //    return currentProductIDs;
    //}
    //$scope.$broadcast('scroll.infiniteScrollComplete');
    //Api.getLatestProducts({}).then(function(res){
    //    var items = res.data;
    //    items.forEach(function (i) {
    //        $scope.products.push(i);
    //        currentProductIDs.push(i._id);
    //    })
    //},function(err){
    //})

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
});
