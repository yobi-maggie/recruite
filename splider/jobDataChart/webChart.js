
// web前端大数据
const request = require('superagent');
require('superagent-proxy')(request);
var cheerio=require('cheerio');
const WebModels=require('../../models/WebModels');

headers = {
    "X-Requested-With": 'XMLHttpRequest',
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36',
    "Origin": 'https://www.lagou.com',
    "Cookie": 'user_trace_token=20171107094437-7641753e-8aa9-4999-a9fd-25b584021509; LGUID=20171107094442-398983fa-c35d-11e7-beb4-525400f775ce; fromsite=www.baidu.com; JSESSIONID=ABAAABAACDBABJB5C85C97DA3E080E12F4817113870201A; index_location_city=%E5%85%A8%E5%9B%BD; SEARCH_ID=59ea392e05d44a3195351b780b9372f6; TG-TRACK-CODE=search_code; X_HTTP_TOKEN=929afeda46c33dbfba0708fb4372b07b; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DUdzsLSWgAt8iVt8j6Z_EOfIvGbFm6NRAawH7ydml8S2JTjbw1riaZ4RNtb5-MGbz%26wd%3D%26eqid%3Ded37849900003002000000065a72738e; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fgongsi%2F147.html; _gat=1; _ga=GA1.2.924031272.1510019080; _gid=GA1.2.1188917727.1517194166; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1517401873,1517450131,1517451895,1517451901; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1517451901; LGSID=20180201095531-fbefb387-06f2-11e8-a389-525400f775ce; LGRID=20180201102501-1af6e8e6-06f7-11e8-a393-525400f775ce',
    "Connection": 'keep-alive'
};

const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*1000)
    })
}

let jobArr = ['Java','PHP','C++','Android','C','iOS','Ruby','Python','go','Node.js'];

(async ()=>{
    let count =1;
    for(var k=0;k<jobArr.length;k++){
        for(var i=1;i<=30;i++){
            await sleep()
            try{
                console.log('尝试获取数据');
                var res = await request.get(`https://www.lagou.com/zhaopin/${jobArr[k]}/${i}`).set(headers)
                let $ = cheerio.load(res.text)
                for(var index = 1;index<=$('.position_link').length;index++){
                    let tempObj = {};
                    tempObj.name = $('.position_link').eq(index-1).find('h3').text();
                    tempObj.area = $('.add').eq(index-1).find('em').text().split('·');
                    tempObj.money = $('.money').eq(index-1).text();

                    tempObj.jd = $('.li_b_l').eq(index-1).text().split('\n');
                    tempObj.jd = tempObj.jd.map((v)=>v.trim()).filter((v)=>v!=='')[1].split('/').map((v)=>v.trim());

                    tempObj.company = $('.company_name').eq(index-1).find('a').text()
                    tempObj.industry = $('.industry').eq(index-1).text().split('\n').map((v)=>v.trim()).filter((v)=>v!=='')[0].split('/').map((v)=>v.trim());

                    tempObj.welfare = $('.li_b_r').eq(index-1).text().replace(/[“”]/g,'');
                    tempObj.tags =  $('.list_item_bot').eq(index-1).find('.li_b_l').text().split('\n').map((v)=>v.trim()).filter((v)=>v!=='');
                    tempObj.time = $('.format-time').eq(index-1).text();

                    let model = new WebModels(tempObj);
                    model.save((err)=>{})
                    console.log('采集到'+ tempObj.name+count++)
                }
            }catch(e){
                // console.log(e);
            }
        }
    }
    
})()

