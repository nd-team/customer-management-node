var app = angular.module('projectServer',[]);
app.factory('projectSer',function ($http) {
    return {
        projectList : projectList,
        projectAdd : projectAdd,
        projectEdit : projectEdit,
        projectId : projectId,
        // projectDetail:projectDetail,
        projectDelete:projectDelete,
        // projectUpload: projectUpload,
        // projectView: projectView,
        // projectDownload: projectDownload,
        projectTotal:projectTotal,
    };
    function projectList(data) {//列表
        return $http.get('/project/list',{
            params:data
        })
    }
    function projectAdd(data) {                   //添加
        return $http.post('/project/add',data)
    }
    function projectId(data){                   //获取数据
        return $http.get('/project/typeId',{
            params:data
        })
    }
    function projectEdit(data) {                   //编辑
        return $http.post('/project/edit',data)
    }
    function projectDelete(data) {                    //删除
        return $http.get('/project/delete',{
            params:data
        })
    }
    // function projectDetail(data) {                   //详情
    //     return $http.get('/project/detail',{params:data})
    // }
    //分页总条数
    function projectTotal(data){
        return $http.get('/project/count',{params:data})
    }
    // function projectUpload(data) {                   //上传附件
    //     return $http.post('/project/upload',data)
    // }
    // function projectView(data) {                   //查看附件
    //     return $http.get('/project/view',{
    //         params:data
    //     })
    // }
    // function projectDownload(data) {                   //下载附件
    //     return $http.get('/project/download',{
    //         params:data
    //     })
    // }
});
