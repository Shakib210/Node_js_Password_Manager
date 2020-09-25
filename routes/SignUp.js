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


router.get('/', function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    if(loginUser){
      res.redirect('./dashboard');
    }else{
      res.render('signup', { title: 'Password management system', msg:'' }); 
    }
   
  });
  
   
  router.post('/',checkUsername,checkEmail, function(req, res, next) {
      const username = req.body.username;
      const email = req.body.email;
      let password = req.body.password;
      const confpassword = req.body.confpassword;
  
      if(password != confpassword){
          res.render('signup', { title: 'Password management system', msg:'Password Not match' });
        }else{
          password=bcrypt.hashSync(password,10);
          const userDeails = new userModule({
              username: username,
              email: email,
              password: password,
          });
          userDeails.save((err,data)=>{
          if(err) throw err;
          res.render('signup', { title: 'Password management system', msg:'Signup successfully' });
        }); 
      }
  });
   
  
  module.exports = router;