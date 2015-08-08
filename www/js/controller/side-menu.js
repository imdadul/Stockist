/**
 * Created by Imdadul Huq on 08-Aug-15.
 */



myApp.controller('SideMenu', function($scope,$ionicPopover,$ionicSideMenuDelegate) {

    $ionicPopover.fromTemplateUrl('templates/right-sidebar-filter.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.rightsiderbarPopover = popover;
    });

    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.filterRightSideBar=function(type){
        $scope.rightsiderbarPopover.hide();
        $scope.toggleRightSideMenu();
    }
    $scope.filterFeed=function(type){

    }

    $scope.asdasd = 'Start' ;
    $scope.clearSearch = function() {
      // $scope.search = '';
        this.search = '';
    };

    $scope.onType = function(val) {
        console.log(val);
    };

})
