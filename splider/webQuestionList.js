
//采集所有页的所有问题
const request = require('superagent');
require('superagent-proxy')(request);
var cheerio=require('cheerio');
const webQuestionModel=require('../models/webQuestionModelList')
const answerSplider = require('./webJob')

headers = {
    "X-Requested-With": 'XMLHttpRequest',
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36',
    "Origin": 'https://www.lagou.com',
    "Cookie": 'user_trace_token=20171107094437-7641753e-8aa9-4999-a9fd-25b584021509; LGUID=20171107094442-398983fa-c35d-11e7-beb4-525400f775ce; fromsite=www.baidu.com; JSESSIONID=ABAAABAACDBABJB5C85C97DA3E080E12F4817113870201A; index_location_city=%E5%85%A8%E5%9B%BD; SEARCH_ID=59ea392e05d44a3195351b780b9372f6; TG-TRACK-CODE=search_code; X_HTTP_TOKEN=929afeda46c33dbfba0708fb4372b07b; _gat=1; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3Dtf1_K52oQIOdS2TXwgRPQO8VZUrHB6Eqw4bCAXZ6q6O%26wd%3D%26eqid%3Ded24d44a00009c27000000065a727a73; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; _ga=GA1.2.924031272.1510019080; _gid=GA1.2.1188917727.1517194166; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1517451895,1517451901,1517452627,1517452632; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1517452632; LGSID=20180201103707-cbc782d9-06f8-11e8-abe2-5254005c3644; LGRID=20180201103711-ce36477b-06f8-11e8-abe2-5254005c3644',
    "Connection": 'keep-alive'
};

const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*3000)
    })
}
let count = 1
let questionSubList = async (subUrl,sortId)=>{
    for(var index=1;index<30;index++){
        try{
            await sleep();
            console.log('开始请求数据')
            let res=await request.get(`${subUrl}&pageNo=${index}&pageSize=10`).type('application/x-www-form-urlencoded').set(headers)
            let items=JSON.parse(res.text).content.data.topicNewsList;
            let item={};
            if(items){
                items.forEach(v=>{
                    item.sortId=sortId,
                    item.userId=v.news.userId,
                    item.questionId=v.news.questionId,
                    item.questionTitle=v.news.questionTitle,
                    item.questionContent=v.news.questionContent,
                    item.answerNum=v.news.answerNum
                    let model = new webQuestionModel(item);
                    model.save();
                    console.log('请求到'+count++)
                })
            }
        }catch(err){

        }
    }
}

module.exports=questionSubList;



