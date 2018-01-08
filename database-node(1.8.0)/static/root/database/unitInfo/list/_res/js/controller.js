var app = angular.module('unitListModel', ['toastr','ng-pagination']);
app.controller('unitListCtrl',function($scope,unitSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null,null);
    if($stateParams.name =='detail'){
        $scope.detailShow = true;
        $scope.detailText = '列表详情';
    }else {
        $scope.detailShow = false;
        $scope.detailText = '列表';
    }
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    function activatePage(page) {
        var listData = {
            page:page||1
        };
        $scope.$emit('changePage', listData.page);
        if($scope.unitLists) return;
        unitSer.unitList(listData).then(function (response) {
            if(response.data.code == 200){
                $scope.unitLists = response.data.data.data;
                $scope.custom.itemsCount = response.data.data.total;
                if($stateParams.id){
                    if($stateParams.id.indexOf('&')){
                        $stateParams.id = $stateParams.id.split('&')[0];
                    }
                    angular.forEach($scope.unitLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('idList', $stateParams.id);
                }
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    }
    //获取id
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function () {  //取消删除
        $scope.delShow = false;
        $state.go('root.database.unitInfo.list[12]',{id:null,name:null});
    };
    var count = 0;
    //确认删除
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id,
            token:$stateParams.tonken,
        };
        unitSer.unitDelete(data).then(function(response){
            if(response.data.code==200){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.$emit('idList', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.database.unitInfo.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.database.unitInfo.list[12]',{id:null,name:null,page:$location.search().page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //点击改变列表颜色
    $scope.showDetail = function(event){
        angular.forEach($scope.unitLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        //向父Ctrl传递事件
        $scope.$emit('changeId',event.id,event.token);
        $scope.$emit('changePage', $location.search().page);
    };
    $scope.jumpDetail = function (event) {
        $scope.detailShow = true;
        $scope.detailText = '列表详情';
        var data = {
            id:event.id,
            token:event.token,
        };
        $scope.custom.itemsCount  = 2;
        unitSer.unitDetail(data).then(function (response) {
            if($scope.detailList) return;
            if(response.data.code == 200){
                $scope.detailList = response.data.data;
                $('.ddWid').width($scope.detailList.percent)
            }
        });
    };
    $scope.unitJump = function () {
        $scope.detailShow = false;
        $scope.detailText = '列表';
    }

});

