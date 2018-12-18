const express = require('express');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const UserDAO=require('./dao/UserDAO');
const User=require('./pojo/User');


const app=express();
app.listen(3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', require('./ServerUser'));

app.get('/', function(req,res){
  let userDAO=new UserDAO();
  res.end()
});
