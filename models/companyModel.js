//web项目职位简介
require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let companyModel=new Schema({
    "companyId": {type: Number},
    "companyLogo": {type: String},
    "name":{type:String},
    "companyFullName": {type: 'String'},
    "jobNature": {type: String},
    "city": {type: 'String'},
    "cities":{type:Array},
    "companyLevel": {type: String},
    "stuffNumber": {type: String},
    "companyInfo": {type: String},
    "haveCollect": {type: String},
    "createTime": {type: String},
    "tags":{type:Array},
    "owner": {type: String},
    "time": { type: String, default: Date.now},
})

companyModel.pre('save',(next)=>{
    this.time=Date.now();
    next();
})
module.exports=mongoose.model('companyModel',companyModel)