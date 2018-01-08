var Router = require('koa-router');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/' + path.basename(path.resolve(__filename,'../'))+'/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var fetch = require('node-fetch');//url转发
var koaBody = require('koa-body');
var request = require('request-promise');
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
var fileType = require(path.resolve('plugins/fileType.js'));
module.exports = function(){
    var router = new Router();
    /*********************************项目信息管理************************************************/
    router.get('/project/list', function*(){ //列表
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().projectList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/project/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().projectDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/project/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().projectAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().projectEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        deleteData.userToken = $self.cookies.get('token');
        yield (server().projectDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/typeId', function*(){//获取id
        var $self = this;
        var findIdData = $self.request.query;
        findIdData.userToken = $self.cookies.get('token');
        yield (server().getId(findIdData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/count', function*(){//获取总条数
        var $self = this;
        var countToken = $self.request.query;
        countToken.userToken = $self.cookies.get('token');
        yield (server().projectTotal(countToken)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        uploadData.userToken = $self.cookies.get('token');
        yield (server().projectUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/view', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        view.userToken = $self.cookies.get('token');
        yield (server().projectView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/download', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        view.userToken = $self.cookies.get('token');
        yield (server().projectDownload(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/list', function*(){ //列表
        /************业主信息管理*************/
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().ownerList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/owner/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().ownerDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/owner/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().ownerAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().ownerEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        deleteData.userToken = $self.cookies.get('token');
        yield (server().ownerDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/typeId', function*(){//获取id
        var $self = this;
        var findIdData = $self.request.query;
        findIdData.userToken = $self.cookies.get('token');
        yield (server().ownerId(findIdData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/count', function*(){//获取总条数
        var $self = this;
        var countToken = $self.request.query;
        countToken.userToken = $self.cookies.get('token');
        yield (server().ownerTotal(countToken)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        uploadData.userToken = $self.cookies.get('token');
        yield (server().ownerUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/view', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        view.userToken = $self.cookies.get('token');
        yield (server().ownerView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/list', function*(){ //列表
        /************中标单位信息管理*************/
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().unitList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/unit/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().unitDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/unit/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().unitAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/unit/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().unitEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        deleteData.userToken = $self.cookies.get('token');
        yield (server().unitDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/typeId', function*(){//获取id
        var $self = this;
        var findIdData = $self.request.query;
        findIdData.userToken = $self.cookies.get('token');
        yield (server().unitId(findIdData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/count', function*(){//获取总条数
        var $self = this;
        var countToken = $self.request.query;
        countToken.userToken = $self.cookies.get('token');
        yield (server().unitTotal(countToken)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/unit/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        uploadData.userToken = $self.cookies.get('token');
        yield (server().unitUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/view', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        view.userToken = $self.cookies.get('token');
        yield (server().unitView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    });
    return router;
};
