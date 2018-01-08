var app = angular.module('database', []);
app.controller('databaseCtrl', function ($scope,$state) {
    if ($state.current.url == '/database') {//默认加载列表
        $state.go('root.database.projectMas');

    }
}).controller('navCtrl',function($scope,$state,$location,$rootScope){
    $scope.menuClass='know';
    $scope.menuCla = function(name){
        $scope.menuClass = name;
    };
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'){
            $scope.idListd = window.location.href.split('id=')[1];
            $scope.menuClass = 'know';
        }
    });

    $scope.navClass='projectMas';
    $scope.navCla = function(name){
        $scope.navClass = name;
    };
    if (window.location.href.split('/').splice(6,1)) {//如果是刷新进来的页面，没有经过list
        $scope.menu = window.location.href.split('/').splice(6,1);
        var abc = $scope.menu.toString();
        $scope.navClass = abc;
    }



 // 组织事件冒泡
    $scope.shop = function (event) {
        event.stopPropagation()
    }
});


