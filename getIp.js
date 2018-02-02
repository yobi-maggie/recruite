const request = require('superagent');
require('superagent-proxy')(request);
var cheerio=require('cheerio');
const IpModels=require('./models/ipModels')

const BASE_URL = "http://www.xicidaili.com/nn/" ;
const targetURL="https://cnodejs.org";

const proxy="http://14.117.179.232:808";

headers = {
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'zh-CN,zh;q=0.9',
	'Connection':'keep-alive',
	'Cookie':'_free_proxy_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJTM5YjNhNjcyOTcwMGFmNmMzYTIxNWU1ZmY5YmFmOWM1BjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMTh1eVNRTXdpVHZLcmxmL3RiaktWaE1YOCtCVHpkTGplWWEwN1M5aG92eW89BjsARg%3D%3D--6b69a4f49be81d81492262adaae6123a77fa010f; Hm_lvt_0cf76c77469e965d2957f0553e6ecf59=1516603545,1516605947,1516607982,1516613885; Hm_lpvt_0cf76c77469e965d2957f0553e6ecf59=1516613911',
	'Host':'www.xicidaili.com',
	'Referer':'http://www.xicidaili.com/nn/2',
	'Upgrade-Insecure-Requests':'1',
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
};

const sleep=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },Math.random()*10000)
    })
}

(async ()=>{
	for(var index=1;index<500;i++){
		try{
			var res = await request.get(BASE_URL + index).set(headers).proxy(proxy);
		}catch(err){
			console.log(err);
		}
		var $=cheerio.load(res.text);
		for(var i=0;i<$('.odd').length;i++){
			let currentIp=`http://${$('.odd').eq(i).find('td').eq(1).text()}:${$('.odd').eq(i).find('td').eq(2).text()}`;
			console.log('采集到 '+currentIp);
			try{
				let result=await request.get(targetURL)
				if(result.statusCode===200){
					var IpModel=new IpModels({
						'proxy':currentIp
					})
					IpModel.save()
				}
			}catch(err){
			}
		}
	}
})()



// var http = require('http')
    
// var opt = {
// 	host:'这里放代理服务器的ip或者域名',
// 	port:'这里放代理服务器的端口号',
// 	method:'POST',//这里是发送的方法
// 	path:'https://www.google.com',//这里是访问的路径
// 	headers:{
// 	//这里放期望发送出去的请求头
// 	}
// }
// //以下是接受数据的代码
// var body = '';
// var req = http.request(opt, function(res) {
// 	console.log("Got response: " + res.statusCode);
// 	res.on('data',function(d){
// 	body += d;
// 	}).on('end', function(){
// 	console.log(res.headers)
// 	console.log(body)
// 	});

// }).on('error', function(e) {
// 	console.log("Got error: " + e.message);
// })
// req.end();