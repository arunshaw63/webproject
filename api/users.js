var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var userModel=require('../module/user');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");

//login
router.post('/login',function(req,res,next){

	var username=req.body.username;	
	var password=req.body.password;
	userModel.find({username:username})
	.exec()
	.then(user=>{
		if(user.length<1){
           res.status(404).json({
			messgae:"Auth failed",
			
		})
		}else{
		res.status(201).json({
			messgae:"user found",
			user:user
		})	
		}
		
	})
	.catch(err=>{
		res.json(err)
	})

	

});
//signup
router.post('/signup',function(req,res,next){

	var username=req.body.username;
	var email=req.body.email;
	var password=req.body.password;
	var confirmpassword=req.body.confirmpassword;
if(password!==confirmpassword){
	res.json({
			messgae:"Password not matched",
			
		})
} else{
	bcrypt.hash(password, 10, function(err, hash) {
    if(err){
    	return res.json({
			messgae:"something wrong plese try again",
			
		})
    }
    else{

	var userDetails=new userModel({		
		username:username,
		email:email,
		password:password,
	
	});
	userDetails.save()
	.then(data=>{
		res.status(201).json({
			messgae:"user registered successfully",
			result:data
		})
	})
	.catch(err=>{
		res.json(err);
	})

    }
});
	}

});
module.exports=router