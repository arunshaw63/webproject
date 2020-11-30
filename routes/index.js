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
}



//signup detils
router.post('/signup',checkEmail,checkUsername, function(req, res, next) {
  var username=req.body.uname;
  var email=req.body.email;
  var password=req.body.password;
  var confpassword=req.body.confpassword;
if(password!=confpassword){
res.render('signup',
 { title: 'Password Management System', msg:'Password not matched' });
  
}else{
  password=bcrypt.hashSync(req.body.password,10);
    var userDetails=new userModule({
    username:username,
    password:password,
    email:email
  });
  //console.log(userDetails)
  userDetails.save((err,doc)=>{
        if(err) throw err;
        res.render('signup', { title: 'Password Management System', msg:'User Registerd Successfully' });
  });

}
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup Form', msg:''  });
});

/* veriy username and password. */
router.post('/', function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  var checkUser=userModule.findOne({username:username});
  checkUser.exec((err,data)=>{
     if(err) throw err;
    var getUserId=data._id;
    var getPassword=data.password;
    var token=jwt.sign({userId:getUserId},'loginToken');
    localStorage.setItem('userToken',token);
    localStorage.setItem('loginUser',username);
    req.session.userName=username;
    if(bcrypt.compareSync(password,getPassword)){
      res.redirect('dashboard');
    }
    else{
      console.log('User password is :'+password+" database password is: "+getPassword);
 res.render('index', { title: 'Password Management System',msg:'InVAlid username and password' });
    }
  })

});


router.get('/', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(req.session.userName){
    res.redirect('./dashboard');
  }
  else {
    res.render('index', { title: 'Password Management System',msg:'' });
  }
  
});
//logout
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
 if(err) 
 { res.redirect('/');}
})
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/');
});
//delete password list

  router.post('/password_detail/edit/:id',checkLoginUser, function(req, res, next) {
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
  res.render('edit_password_detail', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'Password Updated Successfully' });
  });
  });
  });
  });
//edit password list
router.get('/password_detail/edit/:id',function(req,res,next){
	var id=req.params.id;
	var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassCat.exec(function(err,data1){
  res.render('edit_password_detail', { title: 'Password Management System',
  	records:data1,record:data,success:'Password Updated Successfully' });
	 });	
	
});
    });


module.exports = router;
