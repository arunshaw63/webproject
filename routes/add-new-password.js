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

//ckeditor and password category
router.post('/',checkLoginUser,function(req,res,next){
    var loginUser=localStorage.getItem('loginUser');
   var pass_details=req.body.pass_details;
   var project_name= req.body.project_name;
     var pass_cat=req.body.pass_cat;
     var password_details=new passModel({
      password_category:pass_cat,
      password_detail:pass_details,
      project_name:project_name,
     });
  
    password_details.save(function(err,doc){
    getPassCat.exec(function(err,data){
      if(err) throw err;
       res.render('add-new-password',{title:'Password Management System',records:data,success:'Password inserted successfully'})  
     });    
  
   });  
  
  
});
router.get('/',function(req,res,next){
   getPassCat.exec(function(err,data){
    if(err) throw err;
   res.render('add-new-password',{title:'Password Management System',records:data,success:''})  
   });  
  
});


module.exports = router;



