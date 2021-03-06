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
  
    var options = {
      offset:   1, 
      limit:    3
  };
  
  passModel.paginate({},options).then(function(result){
   //console.log(result);
  res.render('viewAllPassword', { title: 'Password Management System',
  loginUser: loginUser,
  records: result.docs,
    current: result.offset,
    pages: Math.ceil(result.total / result.limit) 
  });
  
  });
  });
  
  router.get('/:page',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('logInToken');
    var perPage = 3;
    var page = req.params.page || 1;
    getAllPassword.skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
  if(err) throw err;
  passModel.countDocuments({}).exec((err,count)=>{    
  res.render('viewAllPassword', { title: 'Password Management System',
  loginUser: loginUser,
  records: data,
    current: page,
    pages: Math.ceil(count / perPage) 
  });
    });
  });
  });
  
  
  
  module.exports = router;



    /*
router.get('/viewAllPassword/',checkLoginUser ,function(req, res, next) {
  var loginUser=localStorage.getItem('logInToken');
  var perPage=1;
  var page=req.params.page || 1;

getAllPassword.skip((perPage *page) -perPage).limit(perPage).exec((err,data)=>{
      if(err) throw err;

      passModel.countDocuments({}).exec((err,count)=>{
        res.render('viewAllPassword', { title: 'Password management system' ,loginUser:loginUser, records:data,current: page, pages: Math.ceil(count/perPage)});

      })
     });  
});

router.get('/viewAllPassword/:page',checkLoginUser ,function(req, res, next) {
  var loginUser=localStorage.getItem('logInToken');
  var perPage=1;
  var page=req.params.page || 1;

getAllPassword.skip((perPage *page) -perPage).limit(perPage).exec((err,data)=>{
      if(err) throw err;

      passModel.countDocuments({}).exec((err,count)=>{
        res.render('viewAllPassword', { title: 'Password management system' ,loginUser:loginUser, records:data,current: page, pages: Math.ceil(count/perPage)});

      })
     });     //pagination without plugin
});
*/