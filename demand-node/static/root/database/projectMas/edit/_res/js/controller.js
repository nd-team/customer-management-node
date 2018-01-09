var app = angular.module('editCtrlM', ['toastr']);
app.controller('editCtrl', function($scope, projectSer,$stateParams,$state,toastr,){
    // var data = {
    //     id:$stateParams.id,
    //     tonken:$stateParams.tonken,
    // };
    // $scope.contactOne = function () {
    //     $state.go('root.database.projectMas.upload[12]',{id:$stateParams.id,name:'upload',tonken:$stateParams.tonken,type:1});
    //     $scope.$emit('changeMenu','uploadMenu')
    // };
    // $scope.contactTwo = function () {
    //     $state.go('root.database.projectMas.upload[12]',{id:$stateParams.id,name:'upload',tonken:$stateParams.tonken,type:2});
    //     $scope.$emit('changeMenu','uploadMenu')
    // };
    // $scope.contactThree = function () {
    //     $state.go('root.database.projectMas.upload[12]',{id:$stateParams.id,name:'upload',tonken:$stateParams.tonken,type:3});
    //     $scope.$emit('changeMenu','uploadMenu')
    // };
    // $scope.contactFour = function () {
    //     $state.go('root.database.projectMas.upload[12]',{id:$stateParams.id,name:'upload',tonken:$stateParams.tonken,type:4});
    //     $scope.$emit('changeMenu','uploadMenu')
    // };
    // projectSer.projectDetail(data).then(function (response) {
    //     if(response.data.code == 200){
    //         $scope.edit = response.data.data;
    //     }
    // });
    var acceptData ={id: $stateParams.id};
    //获取ID
    projectSer.projectId(acceptData).then(function(response){
        if(response.data.code== 0){
            $scope.edit = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    $scope.editFun = function () {
        $scope.edit.createCompanyTime= angular.element('.time').val();
        projectSer.projectEdit($scope.edit).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.database.projectMas.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    };
});






