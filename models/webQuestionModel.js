//web前端提问
require('./index')

const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const WebQuestion=new Schema({
    'sortId':{type:String},
    'questionId':{type:Number,unique:true},
    'comment_list':[{
        'userName':{type:String},  //回答者用户名
        'identity':{type:String},  //工作信息
        'starNum':{type:String},  //点赞的数量
        'content':{type:String},  //评价内容  对p标签换行
        'publishTime':{type:String},  //发表时间
    }]
})

module.exports=mongoose.model('WebQuestion',WebQuestion);