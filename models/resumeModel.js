//web项目职位简介
require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let resumeModel=new Schema({
    "userName": {type: String},
    "userId": {type: Number},
    "department": {type: String},
    "name":{type:String},
    "experience": {type: String},
    "birthDate": {type: String},
    "city": {type: String},
    "education":{type:Array},
    "phone": {type: String},
    "email": {type: String},
    "skills": {type: Array},
    "evaluation": {type: String},
    "jobExpectation": {type: Object},
    "workExperience":{type:Array},
    "entryTime": {type: String},
    "time": { type: String, default: Date.now},
    "projectExperience": {type: Array},
})

resumeModel.pre('save',(next)=>{
    this.time=Date.now();
    next();
})
module.exports=mongoose.model('resumeModel',resumeModel)