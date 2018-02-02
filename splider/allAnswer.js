const request = require('superagent');
require('superagent-proxy')(request);

const fs = require('fs')
const SortList=require('../models/sortList')
const answerSplider = require('../splider/webJob')
const questionSubList = require('../splider/webQuestionList')
const webQuestionModel=require('../models/webQuestionModelList')
const spliderSort = require('../splider/sortList')

const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*1000)
    })
}

const sleepOneHour=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*1000*60*60*2)
    })
}

(async ()=>{
    console.log(`开始爬取总分类信息`);
    
    // await spliderSort();
    // await sleepOneHour()
    console.log(`开始根据分类信息爬取问题列表`);
    
    const doc = await SortList.find({});
    for(var index=0;index<doc.length;index++){
        await sleep()
        let subUrl=[];  //本页所有二级页面的链接
        let listUrl=`https://yanzhi.lagou.com/topic/moreTopicNewsList.json?topicId=${doc[index].id}`;
        console.log('采集到列表'+doc[index].id);
        await questionSubList(listUrl,doc[index].id);

        // let answerUrl=`https://yanzhi.lagou.com/question/getAnswerList.json?questionId=${items[index].questionId}`
        // await answerSplider()

        // for(var page=1;page<50;page++){  //采集前50页
        //     let sortUrl=`https://yanzhi.lagou.com/topic/moreTopicNewsList.json?topicId=${doc[index].id}&pageNo=${page}&pageSize=10`;
        //     let res = await request(sortUrl);
        //     let lists=JSON.parse(res.text).content.data.topicNewsList;
        //     if(lists.length!==0){
        //         lists.forEach(v=>{
        //             subUrl.push(v.new.questionId)
        //         })
        //     }else{
        //         return
        //     }
        // }
    }

    saveQuestion()
})()


let saveQuestion = async ()=>{
    console.log(`开始根据问题列表爬取答案`);
    let doc = await webQuestionModel.find({});
    for(var index=0;index<doc.length;index++){
        await sleep();
        let url=`https://yanzhi.lagou.com/question/getAnswerList.json?questionId=${doc[index].questionId}`;
        answerSplider(url,doc[index].sortId);
        console.log('这是第'+index+'的问题');
    }
}