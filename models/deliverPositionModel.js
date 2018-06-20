//web项目职位简介
require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let deliverPositionModel=new Schema({
    "positionId": {type: Number},
    "resumeId": {type: Object}
})

deliverPositionModel.pre('save',(next)=>{
    this.time=Date.now();
    next();
})
module.exports=mongoose.model('deliverPositionModel',deliverPositionModel)