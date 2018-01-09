var app = angular.module('editCtrlM', ['toastr']);
app.controller('editCtrl', function($scope, projectSer,$stateParams,$state,toastr,$http){
    $scope.ads = false;
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    projectSer.projectDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
        }
    });

    //显示隐藏相对应的东西
    //上传文件
    $scope.files = [];
    $scope.affirmFile = [];
    var oldFiles = [];
    $scope.fileNameChanged = function (className,idName,fileIdName) {
        fileName(className,idName,fileIdName)
    };
    function fileName(className,idName,fileIdName) {
        $scope.$apply(function () {//触发angular脏检测
            var elFiles = document.getElementById(fileIdName).files;
            angular.forEach(elFiles,function (obj) {
                $(idName).text(obj.name);
                $(className).attr('title',obj.name);
            });

            for (var i = 0, len = elFiles.length; i < len; i++) {
                var file = elFiles[i];
                var hasOldFile = false;
                for(var ii=0,iiLen=oldFiles.length;ii<iiLen;ii++){
                    if(oldFiles[ii].name==file.name){
                        hasOldFile = true;
                        break;
                    }
                }
                if(!hasOldFile){
                    oldFiles.push(file);
                }
                $scope.files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
        });
    }


    $scope.updataSel = function(idNames){
        modelUpload(idNames)
    };
    function modelUpload(idNames) {
        var fd = new FormData();
        var _files = $scope.files;
        for (var i = 0; i < oldFiles.length; i++) {
            var f = oldFiles[i];
            for (var b = 0; b < _files.length; b++) {
                if (f.name == _files[b].name) {
                    fd.append('files', f);
                    break;
                }
            }
        }
        if (_files.length) {
            $http({
                method: 'POST',
                url: '/project/upload',
                headers: {
                    'Content-Type': undefined
                },
                data: fd,
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    return formData;
                }
            }, function (data) {
                console.info(data);
            }).then(function (response) {
                if (response.data.code == 200) {
                    if(idNames =='#changeText'){
                        $scope.edit.party_a_bid_contract_url= response.data.data;
                    }
                    if(idNames =='#changeTextOne'){
                        $scope.edit.bid_contract_url= response.data.data;
                    }
                    if(idNames =='#changeTextTwo'){
                        $scope.edit.owner_contract_url= response.data.data;
                    }
                    if(idNames =='#changeTextThree'){
                        $scope.edit.party_a_owner_contract_url= response.data.data;
                    }
                    $(idNames).text('成功上传');
                    toastr.success("文件上传成功", '温馨提示');
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    }

    $scope.projectEditFun = function () {  
        $scope.edit.project_collect_time= angular.element('.time').val();

        $scope.edit.party_a_bid_contract_sign_time= angular.element('.one-sign-time').val();
        $scope.edit.party_a_bid_contract_start_time= angular.element('.one-start-time').val();
        $scope.edit.party_a_bid_contract_end_time= angular.element('.one-end-time').val();

        $scope.edit.bid_contract_sign_time= angular.element('.two-sign-time').val();
        $scope.edit.bid_contract_start_time= angular.element('.two-start-time').val();
        $scope.edit.bid_contract_end_time= angular.element('.two-end-time').val();

        $scope.edit.owner_contract_sign_time= angular.element('.three-sign-time').val();
        $scope.edit.owner_contract_start_time= angular.element('.three-start-time').val();
        $scope.edit.owner_contract_end_time= angular.element('.three-end-time').val();

        $scope.edit.party_a_owner_contract_sign_time= angular.element('.four-sign-time').val();
        $scope.edit.party_a_owner_contract_start_time= angular.element('.four-start-time').val();
        $scope.edit.party_a_owner_contract_end_time= angular.element('.four-end-time').val();
        if($scope.edit.party_a_bid_contract == '是'){
            $scope.edit.party_a_bid_contract = 1
        }else {
            $scope.edit.party_a_bid_contract = 0
        }
        if($scope.edit.bid_contract == '是'){
            $scope.edit.bid_contract = 1
        }else {
            $scope.edit.bid_contract = 0
        }
        if($scope.edit.owner_contract == '是'){
            $scope.edit.owner_contract = 1
        }else {
            $scope.edit.owner_contract = 0
        }
        if($scope.edit.party_a_owner_contract == '是'){
            $scope.edit.party_a_owner_contract = 1
        }else {
            $scope.edit.party_a_owner_contract = 0
        }
        projectSer.projectEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.projectMas.list[12]',{id:null,tonken:null});
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






