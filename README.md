# About

项目为毕设项目提供数据服务，采用express搭建服务，数据来源于爬取拉钩上的主流职位信息，所有的言职板块数据，问题列表等
同时有鉴权，用户加密等功能


nodejs + express + mongodb + mongoose + es6/7 


## 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (开启状态)
```

```
git clone https://github.com/heyLiup/node-lagou 

cd node-lagou

npm install

npm start

访问: http://localhost:8080（如果已启动前台程序，则不需打开此地址）

```





## 数据结构部分截图

#### 评论列表数据结构

<img src="https://github.com/heyLiup/node-lagou/blob/master/images/answer.png"/> 
#### 职位信息数据结构

<img src="https://github.com/heyLiup/node-lagou/blob/master/images/job.png"/>

#### 讨论话题数据结构
<img src="https://github.com/heyLiup/node-lagou/blob/master/images/question.png"/>

#### 分类频道数据结构
<img src="https://github.com/heyLiup/node-lagou/blob/master/images/sort.png"/>




# 项目布局

```
.
├── models                        数据模型
│   ├── index.js                    mongodb开关
│   ├── ipModels.js                 ip代理池
│   ├── sortList.js                 分类信息
│   ├── userCount.js                用户信息
│   ├── webModels.js                职位
│   ├── webQuestionModel.js         问题
│   ├── webQuestionModelList.js     问题列表
├── routes                         路由
│   ├── data.js                     数据模块
│   └── users.js                    用户模块
├── splider                      处理中心，负责路由及数据库的具体操作
│   ├── webChart.js                 爬取职位信息
│   ├── allAnswer.js                爬取评论信息
│   ├── sortList.js                 爬取分类信息
│   ├── webJob.js                   爬取话题具体信息
│   ├── webQuestionList.js          爬取话题列表信息
├── .babelrc 
├── app.js                          基础配置
├── COPYING                         GPL协议
├── index.js                        入口文件
├── package.json
├── README.md                  
.


```




# License

[GPL](https://github.com/heyLiup/node-lagou/)



