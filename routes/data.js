var express = require('express');
var Router = express.Router();
var webModels = require('../models/webPositionModelList')
var companyModels = require('../models/companyModel')
var deliverPosition = require("../models/deliverPositionModel")
var mongoose = require('mongoose');
let isLogin = (req,res,next) =>{
    if(!req.cookies.userid){
        return res.send({statu:301,msg:"请登陆"})
    }
    next();
}
// let model = new webModels({
//     positionId: 1, name: '前端工程师', companyLogo: '../../static/icon/jd_portrait.png',companyFullName: '京东',city: '北京',salary: '15k-30k',createTime: '4月15日',cities: [{nameStr: '北京'}, {nameStr: '海淀区'}],experience: '1-3年',department: '本科'
//   })
// model.save();
Router.use('/webJob',isLogin,(req,res,next)=>{
    const {city, keyword, owner} = req.query;
    let query = {};
    if (city && city != "全国") {
        query.city = city;
    }
    if (keyword) {
        query.name = {$regex: keyword, $options:"$i$g"}
    }

    if (owner) {
        query.owner = owner;
    }
    webModels.find(query, (err,doc)=>{
        if(err) return;
        return res.send({data:doc})
    })
})
Router.use('/positionDetail',isLogin,(req,res,next)=>{
    webModels.find(req.query,(err,doc)=>{
        if(err) return;
        return doc.length ? res.send({data:doc[0]}) : res.send({data: {
            status: 404,
            msg: '未找到符合条件的数据',
        }});
    })
})
var i = 0;
Router.post('/position', async (req, res, next)=>{
    // let {userName,password,repassword} = req.body;
    let {name, companyLogo, companyFullName, cities, salary, department, companyId } = req.body;  
	if(name && companyLogo && companyFullName && cities && salary){
        
        let obj = {
            ...req.body,
            cities: JSON.parse(req.body.cities),
            positionDesc: JSON.parse(req.body.positionDesc),
            positionId: i++,
        }
        if (!companyId) {
            return res.send({status: 300, msg: "未找到对应公司ID"});
        }
        companyModels.update({
            companyId
        }, {
            $push:{
                position: obj
            }
        }, function (err, result) {
            if (err) return err;
        })
        let model = new webModels(obj);
        model.save();
        return res.send({status:200,msg:"添加成功"})
	}else{
		return res.send({status:500,msg:"职位信息不完善"})
	}
})
Router.post('/company', async (req, res, next) => {
    let {name, companyLogo, companyFullName, cities, city,companyId, companyLevel, stuffNumber, companyInfo, owner, jobNature } = req.body;
    companyModels.find({
        companyId
    }, (err, doc) => {
        if (err) {
            return res.send({status: 300, msg: "公司ID已存在"});
        } else {
            let companyObj = {
                name: companyFullName,
                companyFullName,
                companyLogo,
                companyId,
                city: city,
                jobNature,
                cities: JSON.parse(cities),
                companyLevel,
                stuffNumber,
                companyInfo,
                owner,
                position: [],
            }
            let company = new companyModels(companyObj);
            company.save();
            return res.send({status:200,msg:"添加成功"})
        }
    })
})
Router.delete('/position_delete', async(req, res, next) => {

    webModels.remove({positionId: req.body.positionId}, (err, doc) => {
        if (err) return ;
        return res.send({data: '', status: 200});

    })
})

Router.use('/companyDetail',isLogin,(req,res,next)=>{
    companyModels.find(req.query,(err,doc)=>{
        if(err) return;
        if (!doc.length) {
           return res.send({
                data: {
                    status: 404,
                    msg: "未找到符合条件的数据"
                }
            })
        }
        webModels.find({
            companyId: doc[0].companyId,
        }, (Modelerr, modelDoc) => {
            if (Modelerr) return;
            var resultData = Object.assign(doc[0], {
                position: modelDoc,
            });
            return doc.length ? res.send({
                data: {
                    companyDetail: resultData,
                    position: modelDoc
                }
            }) : res.send({
                data: {
                    status: 404,
                    msg: "未找到符合条件的数据"
                }
            })
        })

        // return doc.length ? res.send({data:doc[0]}) : res.send({data: {
        //     status: 404,
        //     msg: '',
        // }});
    })
})
Router.use('/companyList', async (req, res, next) => {
    companyModels.find({}, (err, doc) => {
        if (err) return ;
        return res.send({data: doc});
    })
})




Router.use('/starNum',async (req,res,next)=>{
    let {answerId ,answerNum}=JSON.parse(Object.keys(req.body)[0]);
    let doc = await webQuestionModel.find({_id:mongoose.mongo.ObjectId(answerId)});
    res.header("Access-Control-Allow-Origin", "*");
    res.send({data:doc})
})

Router.post('/deliver', async(req, res, next) => {
    const data = req.body;
    // let isExist = await deliverPosition.find(req)
})

module.exports=Router;