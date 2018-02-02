//个人用户账号密码信息
require('./index')

var mongoose = require('mongoose');
var Schema=mongoose.Schema

var UserCount = new Schema({
    userName:{type:String,require:true},
    password:{type:String,require:true},
})

module.exports=mongoose.model('UserCount',UserCount)