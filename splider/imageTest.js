// var fs = require('fs');
// var mkdirp = require('mkdirp');
// const request = require('superagent');
// require('superagent-proxy')(request);

// function downloadImage(imgRrl, dir, filename){
//     request.head(imgRrl, function(err, res, body){
//         request(imgRrl).pipe(fs.createWriteStream(dir + "/" + filename));
//     });
// };

// downloadImage('https://static.lagou.com/image1/M00/25/D4/Cgo8PFVS2SeAWgf8AACUSzhxomw100.png','./','123.jpg')


//斐波那契  第三个数的值等于前两个之和

// 0 1 1 2 3 5 8 13 21 34 55

// let index=1;

// let Fb = (n)=>{
//     console.log(index++)
//     return n<2?n:Fb(n-1)+Fb(n-2);
// }
// console.log(Fb(50))
let index=1;


var fb=function(n){
    var demo = [0,1];
    var lib = function (n) {
        console.log(index++)
        var result = demo[n];
        if(typeof result !== 'number'){
            result = fb(n-1)+fb(n-2);
            demo[n] = result ;
        }
        return result;
    };
    return lib;
}()

console.log(fb(10))


