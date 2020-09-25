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


router.get('/delete/:id',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('logInToken');
    var dId=req.params.id;
    var del=passModel.findByIdAndDelete(dId);
    del.exec((err)=>{
        if(err) throw err;
        res.redirect('/viewAllPassword');
    });
  
  });
  
  router.get('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassCat.exec(function(err,data1){
  res.render('EditPasswordDetails', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'' });
  });
  });
  });
  
  router.post('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passcat= req.body.pass_cat;
    var project_name= req.body.project_name;
    var pass_details= req.body.pass_details;
    passModel.findByIdAndUpdate(id,{password_category:passcat,project_name:project_name,password_detail:pass_details}).exec(function(err){
    if(err) throw err;
     var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassCat.exec(function(err,data1){
  res.render('EditPasswordDetails', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'Password Updated Successfully' });
  });
  });
  });
  });
  
  
  module.exports = router;