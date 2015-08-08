/**
 * Created by Imdadul Huq on 08-Aug-15.
 */


myApp.controller('HomeTabCtrl', function($scope,$state,$ionicPopover,$timeout) {


    console.log('Home contrller!');
    $scope.doRefresh = function() {
        $timeout( function() {
            //simulate async response
            // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);

    };
});
