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

//view password category
router.get('/',function(req,res,next){
   
  getPassCat.exec(function(err,data){
    if(err) throw err;
    res.render('password_category',{title:'Password Management System',records:data})
  });
  
});


//delete password category
router.get('/delete/:id',function(req,res,next){
   var passCat_id=req.params.id;
  console.log('this is id of password'+passCat_id);
    var passdelete= passCateModel.findByIdAndDelete(passCat_id);
  passdelete.exec(function(err){
    if(err) throw err;
    res.redirect('/passwordCategory');
  });
  
});

//edit password category
router.get('/edit/:id',function(req,res,next){
   var loginUser=localStorage.getItem('loginUser');
   var passCat_id=req.params.id;
  console.log('this is id of password'+passCat_id);
    var passedit= passCateModel.findById(passCat_id);
  passedit.exec(function(err,data){
    if(err) throw err;
    res.render('edit_pass_category',{id:passCat_id,title:'Password Management System',loginUser:loginUser,errors:'',success:'',records:data})
  });
  
});

router.post('/edit',function(req,res,next){
   var loginUser=localStorage.getItem('loginUser');
  var passcat_id=req.body.id;
  var passwordCategory=req.body.passwordCategory;
    var update_passcat= passCateModel.findByIdAndUpdate(passcat_id,{'password_category':passwordCategory});
  update_passcat.exec(function(err,doc){
    if(err) throw err;
    res.redirect('/passwordCategory');
  });
  
});

module.exports = router;



