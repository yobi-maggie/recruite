var express = require('express');
var Router = express.Router();

var companyModels = require('../models/companyModel')
var resumeModel = require('../models/resumeModel')
var mongoose = require('mongoose');
let isLogin = (req,res,next) =>{
    if(!req.cookies.userid){
        return res.send({statu:301,msg:"请登陆"})
    }
    next();
}
Router.use('/resume',isLogin,(req,res,next)=>{
    resumeModel.find(req.query,(err,doc)=>{
        if(err) return;
        return res.send({data:doc})
    })
})
Router.post('/addResume', async (req, res, next) => {
    let {userName, department, name, experience, city,birthDate, education, phone, email, skills, evaluation, jobExpectation,workExperience, entryTime,projectExperience } = req.body;
    resumeModel.find({
        userName
    }, (err, doc) => {
        if (err) {
            return res.send({status: 300, msg: "该用户名已存在简历"});
        } else {
            let resumeObj = {
                userName,
                department,
                name,
                experience,
                city: city,
                birthDate,
                education: JSON.parse(education),
                phone,
                email,
                skills: JSON.parse(skills),
                evaluation: evaluation,
                jobExpectation: JSON.parse(jobExpectation),
                workExperience: JSON.parse(workExperience),
                entryTime,
                projectExperience: JSON.parse(projectExperience),
            }
            let resume = new resumeModel(resumeObj);
            resume.save();
            return res.send({status:200,msg:"添加成功"})
        }
    })
})

module.exports=Router;