require('./index')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SortList = new Schema({   //所有问题的分类列表
    'answerCount':{type:String},
    'attentionCount':{type:String},
    'content':{type:String},
    'id':{type:String,unique:"true"},
    'logo':{type:String},
    'questionCount':{type:String},
    'title':{type:String},
})

module.exports = mongoose.model('sortList',SortList);

