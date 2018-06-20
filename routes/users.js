var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var userCount = require('../models/userCount')
// const cookie=require('cookie-parser');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', async (req, res, next) => {
	let doc = await userCount.find({});
	let data = doc.map((item) => {
		return item;
	})
	return res.send({data});
})
router.post('/login', async (req, res, next)=>{
	let {userName,password} = req.body;
	try{
		let doc = await userCount.find({userName:userName});
		if(doc.length!==0){
			if(md5(password)==doc[0].password && !doc[0].isDisable){
				res.cookie('userid',doc[0]._id, { maxAge: 900000, httpOnly: false});
				return res.send({status:200,msg:"登陆成功",data:{
					collectionPosition:doc[0].collectionPosition,
					contact: doc[0].contact,
					deliver: doc[0].deliver,
					userName: doc[0].userName,
					userType: doc[0].userType,
					_id: doc[0]._id,
				}})
			}else if (doc[0].isDisable) {
				return res.send({status:500,msg:"该账户已冻结"})
			}else{
				return res.send({status:500,msg:"密码错误"})
			}
		}else{
			return res.send({status:500,msg:"账号不存在"})
		}
	}catch(e){

	}
});

router.use('/signout', async (req, res, next)=>{
	res.clearCookie('userid', { maxAge : 0 ,HttpOnly:false});
	return res.send({status:200,msg:"退出成功"})

});
router.use('/get', async(req, res, next) => {
	console.log(req.body)
	// userCount.find({_id: userDetail._id})
})
router.post('/change', async(req, res, next) => {
	const userDetail = JSON.parse(req.body.userDetail);
	userCount.update({_id: userDetail._id}, userDetail, function (err, result) {
		if (err) return ;
		return res.send({status: 200, msg: "更新成功"})
	})

})
router.post('/deliver', async(req, res, next) => {
	const userDetail = JSON.parse(req.body.userDetail);
	userCount.update({_id: userDetail._id}, userDetail, async (err, result) =>{
		if (err) return ;
		const doc = await userCount.find({_id: userDetail._id});
		return res.send({status: 200, msg: "更新成功", data: doc})
	})
})
router.post('/regist', async (req, res, next)=>{
	let {userName,password,repassword, userType, contact} = req.body;
	let doc = await userCount.find({userName});
	if(doc.length !== 0){
		return res.send({status:500,msg:"用户名已被注册"})
	}
	if(userName&&password&&repassword&&userType){
		if(password==password){
			password=md5(password);
			let model = new userCount({userName,password,userType, contact})
			model.save();
			return res.send({status:200,msg:"注册成功"})
		}else{
			return res.send({status:500,msg:"密码输入不一致"})
		}
	}else{
		return res.send({status:500,msg:"注册信息不完善"})
	}
});

let md5 = function (str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};

module.exports = router;
