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
        yield (server().projectDelete(deleteData)
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
        yield (server().projectView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/download', function*(){//下载附件
        var $self = this;
        var count = $self.request.query;
        yield (fetch(config()['rurl']+`/customer/index/dowContract${urlEncode(count,true)}`, {
            method : 'GET',
        }).then((res)=>{
            fileType(res.headers._headers['content-disposition'][0].split('filename=/')[1],this,true);
            return res.buffer();
        }).then(function(data){
            $self.body = data;
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
    }).post('/owner/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().ownerUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/list', function*(){ //列表
        /************中标单位信息管理*************/
        var $self = this;
        var page = $self.request.query;
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
        yield (server().unitDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/list', function*(){ //列表
        /************站点信息*************/
        var $self = this;
        var page = $self.request.query;
        yield (server().siteList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/site/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        yield (server().siteDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/site/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        yield (server().siteAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/site/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        yield (server().siteEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().siteDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/download', function*(){//下载
        var $self = this;
        var count = $self.request.query;
        var fileName = '站点模板'+'.xlsx';
        yield (fetch(config()['rurl']+`/customer/index/dowFormatWord`, {
            method : 'GET'
        }).then(function(res){
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).post('/site/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().siteUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    })
    return router;
};
