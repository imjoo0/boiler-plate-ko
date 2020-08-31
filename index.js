
const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require("./models/User");

// body-parser 의 옵션을 주기 위한 코드 bodyparser : client에서 오는 정보를 서버에서 분석해서 가져올 수 있도록 하는것 
app.use(bodyParser.urlencoded({extended: true})); //application/x-www-form-urlencoded
app.use(bodyParser.json()); //application/json 타입으로 된것을 분석해서 가져올 수 있게 하기 위함. 

const mongoose = require('mongoose');
const user = require('./models/User');

mongoose.connect('config.mongoURI',{
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!! hihi')
})

//회원 가입을 위한 route , route의 endpoint : /register
app.post('/register',(req,res)=>{
  //회원 가입시 필요한 정보들을 (client에서 보내주는 이메일, 아이디, 패스워드등을) 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err,userInfo)=>{ // user.save() user에서 오는 정보들을 mongoDB서버에 저장 
    if(err) return res.json({success:false,err}) // 에러가 있는 경우, success false
    return res.status(200).json({ success: true }); // 200은 에러가 없음을 의미 success true 
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})