//web前端问题 回答列表
require('./index')

const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const WebQuestionList=new Schema({
    'sortId':{type:String},  //问题分类
    'questionId':{type:String,unique:true},
    'questionTitle':{type:String},  //用户的问题标题栏
    'questionContent':{type:String}, //问题补充描述，
    'answerNum':{type:Number}, //回答数量
    'time':{type:String},
    'userId':{type:String},
})

module.exports=mongoose.model('WebQuestionList',WebQuestionList);