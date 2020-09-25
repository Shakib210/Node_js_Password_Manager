const express = require('express');
const path = require('path');
const  passCatModel=require('../modules/password_category');
const router = express.Router();
const userModule = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passModel=require('../modules/add_password');
const { check, validationResult } = require('express-validator');
const passcatModel = require('../modules/password_category');
var getPassCat=passCatModel.find({});
var getAllPassword=passModel.find({});
function checkLoginUser(req,res,next){

    const userToken = localStorage.getItem('userToken');
    try {
        const decoded = jwt.verify(userToken, 'logInToken');
    } catch(err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


/* GET home page. */
  router.get('/', function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    if(loginUser){
      res.render('dashboard', { title: 'Password Management System', msg:'' });
    }else{
    res.render('index', { title: 'Password Management System', msg:'' });
    }
  
});


router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const checkUser = userModule.findOne({username: username});
    checkUser.exec((err, data)=>{
    if(err) throw err;

    if(data==null){
      res.render('index',{title:'Password management System',msg:'Invalid username and password'});
    }else{
        const getp = data.password;
        const getid = data._id;

        if(bcrypt.compareSync(password,getp)){
            const token = jwt.sign({userId: getid}, 'logInToken');
            localStorage.setItem('userToken',token);
      localStorage.setItem('logInToken',username);
      res.redirect('dashboard');
    }else{
      res.render('index',{title:'Password management System',msg:'login not suc'});
    }
    }
});
});

function checkEmail(req,res,next){
    const email = req.body.email;
    const checkexitemail = userModule.findOne({email: email});
    checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'Email Already Exit' });

 }
 next();
  });
}


function checkUsername(req,res,next){
    const username = req.body.username;
    const checkexitemail = userModule.findOne({username: username});
    checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'username Already Exit' });

 }
 next();
  });
}

router.get('/logout/', function(req, res, next) {
  localStorage.removeItem('logInToken');
  localStorage.removeItem('userToken');
  res.redirect('/');
});



module.exports = router;
