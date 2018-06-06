//个人用户账号密码信息
require('./index')

var mongoose = require('mongoose');
var Schema=mongoose.Schema

var UserCount = new Schema({
    userName:{type:String,require:true},
    password:{type:String,require:true},
    userType: {type: String, require: true},
    contact: {type: String},
    collectionPosition: {type: Array},
    deliver: {type: Array},
})

// console.log(UserCount)

module.exports=mongoose.model('UserCount',UserCount)