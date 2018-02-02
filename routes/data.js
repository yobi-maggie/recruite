var express = require('express');
var Router = express.Router();

var webModels = require('../models/webModels')
var sortList = require('../models/sortList')
var webQuestionModelList = require('../models/webQuestionModelList')
var webQuestionModel = require('../models/webQuestionModel')
var mongoose = require('mongoose');

let isLogin = (req,res,next) =>{
    if(!req.cookies.userid){
        return res.send({statu:301,msg:"请登陆"})
    }
    next();
}

Router.use('/webJob',isLogin,(req,res,next)=>{
    webModels.find({},(err,doc)=>{
        if(err) return;
        return res.send({data:doc})
    })
})

Router.use('/sortList',async (req,res,next)=>{
    let {page,pageSize,sortId}=req.query;
    if(sortId){
        let doc = await sortList.find({id:sortId}).skip(0).limit(pageSize*page);
        res.header("Access-Control-Allow-Origin", "*");
        return res.send({data:doc})
    }
    let doc = await sortList.find({}).skip(0).limit(pageSize*page);
    res.header("Access-Control-Allow-Origin", "*");
    res.send({data:doc})
})

Router.use('/questionList',async (req,res,next)=>{
    let {page,pageSize,sortId,questionId}=req.query;
    if(questionId){
        let doc = await webQuestionModelList.find({questionId:questionId})
        res.header("Access-Control-Allow-Origin", "*");
        return res.send({data:doc})
    }
    let doc = await webQuestionModelList.find({sortId:sortId}).skip(0).limit(pageSize*page)
    res.header("Access-Control-Allow-Origin", "*");
    res.send({data:doc})
})

Router.use('/question',async (req,res,next)=>{
    let {questionId}=req.query;
    let doc = await webQuestionModel.find({questionId:questionId})
    res.header("Access-Control-Allow-Origin", "*");
    res.send({data:doc})
})


Router.use('/starNum',async (req,res,next)=>{
    let {answerId ,answerNum}=JSON.parse(Object.keys(req.body)[0]);
    console.log(mongoose.mongo.ObjectId(answerId))
    let doc = await webQuestionModel.find({_id:mongoose.mongo.ObjectId(answerId)});
    res.header("Access-Control-Allow-Origin", "*");
    res.send({data:doc})
})



module.exports=Router;