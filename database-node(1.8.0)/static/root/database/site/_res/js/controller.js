var app = angular.module('site', [{
    files:[
        "root/database/site/_res/js/service.js"
    ]
}]);
app.controller('siteCtrl',function ($scope,$state) {
    if ($state.current.url == '/site') {//默认加载列表
        $state.go('root.database.site.list[12]');
    }
}).controller('siteMenuCtrl',function($scope,$state,$rootScope,$location){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass = urlName+"Menu";
    $scope.navClass= function(name){
        $scope.menuClass = name;
    };
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu'
        }
    }
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'&& window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    //监听到父Ctrl后改变事件
    $scope.$on("listId", function(event, msg,token){
        $scope.idListd = msg;
        $scope.tonken = token;
    });
    $scope.$on("ableMenu", function(event,menu){
         $scope.menuClass = menu;
    });
    $scope.$on('listPage',function (event,page) {
        $scope.page = page;
    });
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.database.site.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page,tonken:$scope.tonken});
            $scope.menuClass = 'deleteMenu';
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
        $state.go('root.database.site.list[12]',{id:null,name:null,page:null,tonken:null});
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = null;
    };
    $scope.upload = function(){
        $scope.menuClass = 'uploadMenu';
    };
    $scope.download = function(){
        $scope.menuClass = 'listMenu';
        window.open(`/site/download`)
    };
    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.database.site.edit[12]',{id:$scope.idListd,tonken:$scope.tonken});
            $scope.menuClass = 'editMenu'
        }
    };
});
