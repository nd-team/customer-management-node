var app = angular.module('viewCtrlM', ['toastr']);
app.controller('viewCtrl', function($scope, projectSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        tonken:$stateParams.tonken
    };
    projectSer.projectView(data).then(function (response) {
        if(response.data.code == 200){
            $scope.views = response.data.data;
        }else {
            toastr.error('没有附件','温馨提示');
            $state.go('root.database.projectMas.list[12]',{id:null,name:null});
        }
    });
    $scope.del = function (obj) {
        var data = {
            id:$stateParams.id,
            tonken:$stateParams.tonken,
            type:obj
        };
        projectSer.projectDelete(data).then(function(response){
            if(response.data.code==200){
                toastr.info('删除成功','温馨提示');
                projectSer.projectView(data).then(function (response) {
                    if(response.data.code == 200){
                        $scope.views = response.data.data;
                    }else {
                        toastr.error('没有附件','温馨提示');
                        $state.go('root.database.projectMas.list[12]',{id:null,name:null});
                    }
                });
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    $scope.dol = function (obj) {
        var data = {
            id:$stateParams.id,
            tonken:$stateParams.tonken,
            type:obj
        };
        projectSer.projectDownload(data).then(function(response){
            if(response.data.code==200){
                toastr.info( "已删除", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };

    $scope.editFun = function () {
        projectSer.editRange(data).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.organize.views.range.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






