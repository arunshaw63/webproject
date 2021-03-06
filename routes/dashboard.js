var express = require('express');
var router = express.Router();
var userModule=require('../module/user');
var passCateModel =require('../module/password_category');
var passModel =require('../module/add_password');
var getPassCat=passCateModel.find({});
var getAllPassword=passModel.find({});
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
};

function checkLoginUser(req,res,next){
	var userToken=localStorage.getItem('userToken');
	try{
    if(req.session.userName){
 var decoded=jwt.verify(userToken,'loginToken');
    }
    else{
        res.redirect('/')
      }  
	}
	catch(err){
		res.redirect('/')
	}
	next();
}


function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=userModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){  
return res.render('signup', { title: 'Password Management System', msg:'Email Already Exit' });
 }
 next();
  });
}

function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexituname=userModule.findOne({username:uname});
  checkexituname.exec((err,data1)=>{
 if(err) throw err;
 if(data1){
  
return res.render('signup', { title: 'Password Management System', msg:'Username Already Exit' });

 }
 next();
  });
};

//dashboard
router.get('/',checkLoginUser,function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  res.render('dashboard', { title: 'Login Form', loginUser:loginUser  });
});

module.exports = router;



