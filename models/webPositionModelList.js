//web项目职位简介
require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let WebModel=new Schema({
    "positionId": {type: Number},
    "companyLogo": {type: String},
    "name":{type:String},
    "companyFullName": {type: 'String'},
    "city": {type: 'String'},
    "cities":{type:Array},
    "salary":{type:String},
    "experience": {type: String},
    "department": {type: String},
    "companyLevel": {type: String},
    "stuffNumber": {type: String},
    "positionDesc": {type: Array},
    "companyInfo": {type: String},
    "companyId": {
        type: String,
        ref : 'companyModel'
    },
    "advantage": {type: String},
    "jobNature": {type: String},
    "haveCollect": {type: String},
    "company":{type:String},
    "createTime": {type: String},
    "tags":{type:Array},
    "time": { type: String, default: Date.now},
    "owner": {type: String},
    "deliver": {type: Array},
})
WebModel.statics = {
    findCompanyByPositionId:function(positionId, callback){
        return this
            .findOne({positionId : positionId}).populate('companyId')  // 关联查询
            .exec(callback)
    }
}
WebModel.pre('save',(next)=>{
    this.time=Date.now();
    next();
})
WebModel.remove({});
module.exports=mongoose.model('WebModel',WebModel)