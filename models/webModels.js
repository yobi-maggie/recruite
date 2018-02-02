//web项目职位简介
require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WebModel=new Schema({
    "name":{type:String},
    "area":{type:Array},
    "money":{type:String},
    "jd":{type:Array},
    "company":{type:String},
    "industry":{type:Array},
    "welfare":{type:String},
    "tags":{type:Array},
    "time": { type: String, default: Date.now},
})

WebModel.pre('save',(next)=>{
    this.time=Date.now();
    next();
})

module.exports=mongoose.model('WebModel',WebModel)