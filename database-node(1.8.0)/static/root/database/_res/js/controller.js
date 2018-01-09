var app = angular.module('database', []);
app.controller('databaseCtrl', function ($scope,$state) {
    if ($state.current.url == '/database') {//默认加载列表
        $state.go('root.database.projectMas');
    }
}).controller('navCtrl',function($scope,$state,$location,$rootScope){
    //一级导航
    $scope.menuClass='know';
    $scope.menuCla = function(name){
        $scope.menuClass = name;
    };

    //二级导航
    $scope.navClass= 'projectMas';
    $scope.navCla = function(name){
        $scope.navClass = name;
    };

    if (window.location.href.split('/').splice(6,1)) {//如果是刷新进来的页面，没有经过list
        $scope.menu = window.location.href.split('/').splice(6,1);
        $scope.navClass = String($scope.menu);
    }


    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'){
            $scope.navClas = window.location.href.split('/').splice(-2,1);
            $scope.menuClass ='know';
            $scope.navClass =String($scope.navClas);
        }
    });

    // console.log("屏幕宽度:"+screen.width,"屏幕高度:"+screen.height);
    // console.log("屏幕可用宽度:"+screen.availWidth,"屏幕可用高度:"+screen.availHeight);
    // console.log("浏览器宽度:"+window.outerWidth,"浏览器高度:"+window.outerHeight);
    //判断电脑屏幕大小
 // 组织事件冒泡
    $scope.shop = function (event) {
        event.stopPropagation()
    };

    $scope.jumpPage = function () {
       window.location.replace("https://demand.issp.bjike.com");
    }
});


