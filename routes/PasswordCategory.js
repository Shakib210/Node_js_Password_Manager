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
      getPassCat.exec((err,data)=>{
         if(err) throw err;
         res.render('password_category', { title: 'Password management system', loginUser:loginUser ,records:data});
      });
  });
  
  router.get('/delete/:id',checkLoginUser ,function(req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    const passCat_id=req.params.id;
    var passDelete=passCatModel.findByIdAndDelete(passCat_id);
  
    passDelete.exec((err)=>{
       if(err) throw err;
       res.redirect('/passwordCategory')
    });
  });
  
  router.get('/edit/:id',checkLoginUser ,function(req, res, next) {
    const loginUser = localStorage.getItem('loginUser');
    const passCat_id=req.params.id;
    var getPassCategory=passCatModel.findById(passCat_id);
  
    getPassCategory.exec((err,data)=>{
       if(err) throw err;
       res.render('edit_pass_category', { title: 'Password management system', errors:'',success:'' ,records:data, id:passCat_id});
    });
  });
  
  
  router.post('/edit/',checkLoginUser ,function(req, res, next) {
    const loginUser = localStorage.getItem('loginUser');
    var passCat_id=req.body.id;
    var Category_name=req.body.passwordCategory;
    var update= passcatModel.findByIdAndUpdate(passCat_id,{password_cat: Category_name})
    
  
    update.exec((err,data)=>{
       if(err) throw err;
       res.redirect('/passwordCategory');
    });
  });
  
  
  
  module.exports = router;