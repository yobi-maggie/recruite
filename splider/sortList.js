//爬取所有总分类

const request = require('superagent');
require('superagent-proxy')(request);
var mkdirp = require('mkdirp');
const fs = require('fs')
const QuestionModel=require('../models/sortList')


const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*10000)
    })
}

//本地存储目录
var dir = './images/items';
//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});

function downloadImage(imgRrl, dir, filename){
    try{
        request.head(imgRrl, function(err, res, body){
            request(imgRrl).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    }catch(e){
        
    }
    
};

let spliderSort = async ()=>{
    for(index=1;index<1000;index++){
        await sleep();
        let url=`https://yanzhi.lagou.com/topic/getTopicList.json?categoryId=&pageNo=${index}&pageSize=10`
        let res = await request(url)
        res = JSON.parse(res.text).content.data.topicPage.result;
        // console.log(JSON.parse(res.text).content);
        
        if(res.length!==0){
            let item={};
            res.forEach(v=>{
                item.answerCount=v.answerCount,
                item.attentionCount=v.attentionCount,
                item.content=v.content,
                item.id=v.id,
                item.logo=v.logo,
                item.questionCount=v.questionCount,
                item.title=v.title
                let model=new QuestionModel(item)
                model.save()
                // downloadImage('https://static.lagou.com/image1/M00/25/D4/Cgo8PFVS2SeAWgf8AACUSzhxomw100.png','./','123.jpg')

                downloadImage(`https://static.lagou.com/${v.logo}`,'./images/items',`list${index}.jpg`);
                console.log('采集中...'+index)
            })
        }
    }
}

module.exports = spliderSort


