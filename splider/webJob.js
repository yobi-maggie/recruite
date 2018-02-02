
// 一个列表的所有答案
const request = require('superagent');
require('superagent-proxy')(request);
var cheerio=require('cheerio');
const WebModel=require('../models/webQuestionModel');
const webQuestionModel=require('../models/webQuestionModelList')


var BASE_URL="https://www.lagou.com/zhaopin/webqianduan/";

headers = {
    "X-Requested-With": 'XMLHttpRequest',
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36',
    "Origin": 'https://www.lagou.com',
    "Cookie": 'user_trace_token=20170211115515-2db01e4efbb24178989f2b6139d3698e; LGUID=20170211115515-e593a6c4-f00d-11e6-8f71-5254005c3644; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=0; index_location_city=%E5%85%A8%E5%9B%BD; login=false; unick=""; _putrc=""; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1486785316; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1486789519; _ga=GA1.2.1374329991.1486785316; LGRID=20170211130519-af0ec03c-f017-11e6-a32c-525400f775ce; TG-TRACK-CODE=search_code; JSESSIONID=A5AC6E7C54130E13C1519ABA7F70BC3C; SEARCH_ID=053c985ab53e463eb5f747658872ef29',
    "Connection": 'keep-alive'
};

const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*1000)
    })
}
let counts=1;
let answerSplider=async (url,sortId)=>{
    let items=await webQuestionModel.find({});
    for(var index=1;index<items.length;++index){
        await sleep();
        console.log(`总共${items.length}正在采集第${items[index].questionId}个问题`);
        
        for(var count=1;count<9;count++){
            let url=`https://yanzhi.lagou.com/question/getAnswerList.json?questionId=${items[index].questionId}&pageSize=10&pageNo=${count}&sort=0`;
            try{
                var res=await request.get(`${url}&pageSize=10&pageNo=${count}&sort=0`).type('application/x-www-form-urlencoded').set(headers)
            }catch(err){

            }
            let lists=JSON.parse(res.text).content.data.answerList;
            let item={};
            item.sortId=items[index].sortId;
            item.questionId=items[index].questionId;
            let itemSub=[];
            if(lists.length!==0){
                lists.forEach(v=>{
                    let subobj={};
                    subobj.userName=v.answerUser.userName
                    subobj.identity=v.identity
                    subobj.starNum=v.starNum
                    subobj.content=v.content
                    subobj.publishTime=v.publishTime
                    itemSub.push(subobj)    
                })

                item.comment_list=itemSub;
                let model = new WebModel(item);
                model.save();
                console.log('采集到'+counts++);   
            }
        }
    }
}

answerSplider();
module.exports=answerSplider;





