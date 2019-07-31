const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

let app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:"07teducn"
}));

var pool=mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'user',
  port:3306,
  connectionLimit:25
})
http.createServer(app).listen(3001);

//注册
app.post("/reg",(req,res)=>{
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  pool.getConnection((err,conn)=>{
    if(err)throw err;
    var sql = "INSERT INTO user VALUES(null,?,md5(?))";
    conn.query(sql,[uname,upwd],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
        res.json({code:1,msg:"注册成功"});
      }else{
        res.json({code:-1,msg:"注册失败"});
      }
      conn.release();
    })
  })
})

//登录
app.post('/login',(req,res)=>{
  var u = req.body.uname;
  var p = req.body.upwd;
  pool.getConnection((err,conn)=>{
    if(err) throw err;
    var sql ="SELECT * FROM user WHERE uname=?";
    sql += " AND upwd=md5(?)";
    conn.query(sql,[u,p],(err,result)=>{
      if(result.legth>0){
        var uid = result[0].uid;
        req.session.uid = uid;
        res.json({code:1,msg:"登录成功"})
      } else {
        res.json({code:-1,msg:"用户名或密码错误"});
      }
      conn.release();
    })
  })
})

