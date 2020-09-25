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

router.get('/',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('logInToken');
    res.render('AddnewCategory', { title: 'Password management system',loginUser:loginUser ,msg:'',errors:'',success:'' });
  });
  
  
  router.post('/',checkLoginUser, [ check('passwordCategory','Enter Password Category Name').isLength({ min: 1 })],function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     
      res.render('AddnewCategory', { title: 'Password Management System',loginUser: loginUser, errors:errors.mapped(),success:'' });
  
    }else{
       var passCatName =req.body.passwordCategory;
       var passcatDetails =new passcatModel({
        password_cat: passCatName
       });
  
       passcatDetails.save(function(err,doc){
         if(err) throw err;
         res.render('AddnewCategory', { title: 'Password Management System',loginUser: loginUser, errors:'', success:'Password category inserted successfully' });
  
       })
      
    }
    });
  module.exports = router;