var request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
module.exports = function () {
    /*******企业需求*********/
    this.projectList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/bidunit/v1/maps${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.projectAdd = function (argvs) { //添加

        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/bidunit/v1/save`,
            headers:{
                userToken:argvs.userToken
            },
            form: argvs
        };
        return request(options);
    };
    this.projectDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/projectInfo${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };

    this.projectEdit = function (argvs) { //编辑
        var options = {
            method: 'PUT',
            timeout: 3000,
            uri: config()['rurl'] + `/bidunit/v1/update/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
            form: argvs
        };
        return request(options);
    };
    this.projectDelete = function (argvs) {       //删除
        var options = {
            method: 'DELETE',
            timeout: 3000,
            uri: config()['rurl'] + `/bidunit/v1/delete/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
        };

        return request(options);
    };
    this.getId = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/bidunit/v1/findById/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            }
        };
        return request(options);
    };
    //获取总条数
    this.projectTotal = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/bidunit/v1/getTotal${urlEncode(argvs,true)}`,

            headers:{
                userToken:argvs.userToken
            }
        };

        return request(options);
    };
    //上传附件
    this.projectUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/uploadEnclosure${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.projectView = function (argvs) {       // 查看附件
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/slectEnclosure${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };

        return request(options);
    };
    this.projectDownload = function (argvs) {       // 下载附件
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/downloadEnclosure${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };

    /*******************************业主信息管理*******************************/
    this.ownerList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/owner/v1/maps${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.ownerAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/owner/v1/save`,
            headers:{
                userToken:argvs.userToken
            },
            form: argvs
        };
        return request(options);
    };
    this.ownerDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/bidCompanyInfo${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };

    this.ownerEdit = function (argvs) { //编辑
        var options = {
            method: 'PUT',
            timeout: 3000,
            uri: config()['rurl'] + `/owner/v1/update/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
            form: argvs
        };
        return request(options);
    };
    this.ownerDelete = function (argvs) {       //删除
        var options = {
            method: 'DELETE',
            timeout: 3000,
            uri: config()['rurl'] + `/owner/v1/delete/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.ownerId = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/owner/v1/findById/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            }
        };
        return request(options);
    };
    //获取总条数
    this.ownerTotal = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/owner/v1/getTotal${urlEncode(argvs,true)}`,

            headers:{
                userToken:argvs.userToken
            }
        };

        return request(options);
    };
    //上传附件
    this.ownerUpload = function(argvs){
        var options = {
            url: config()['burl']+`/customer/index/uploadEnclosure${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.ownerView = function (argvs) {       // 查看附件
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['burl'] + `/customer/index/slectEnclosure${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };






    /*******************************中标单位信息管理*******************************/
    this.unitList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/site/v1/maps${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.unitAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/site/v1/save`,
            form: argvs,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.unitDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/bidCompanyInfo${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };

    this.unitEdit = function (argvs) { //编辑
        var options = {
            method: 'PUT',
            timeout: 3000,
            uri: config()['rurl'] + `/site/v1/update/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
            form: argvs
        };
        return request(options);
    };
    this.unitDelete = function (argvs) {       //删除
        var options = {
            method: 'DELETE',
            timeout: 3000,
            uri: config()['rurl'] + `/site/v1/delete/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            },
        };
        return request(options);
    };
    this.unitId = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/site/v1/findById/${argvs.id}`,
            headers:{
                userToken:argvs.userToken
            }
        };
        return request(options);
    };
    //获取总条数
    this.unitTotal = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] + `/site/v1/getTotal${urlEncode(argvs,true)}`,

            headers:{
                userToken:argvs.userToken
            }
        };

        return request(options);
    };
    //上传附件
    this.unitUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/uploadEnclosure${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            headers:{
                userToken:argvs.userToken
            },
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };
    this.unitView = function (argvs) {       // 查看附件
        var options = {
            method: 'GET',
            timeout: 3000,
            headers:{
                userToken:argvs.userToken
            },
            uri: config()['rurl'] + `/customer/index/slectEnclosure${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    return this;
};
