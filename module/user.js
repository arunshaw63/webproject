const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useCreateIndex: true,});
//require('dotenv').config();
//var dburl=process.env.MONDO_DB_URL;
//mongoose.connect(dburl,{useNewUrlParser: true, useCreateIndex: true,});
var conn=mongoose.Collection;
var userSchema=new mongoose.Schema({

	username:{
		type:String,
		require:true,
		index:{
			unique:true
		}},
	password: {
        type:String, 
        require: true
    },
	email:{
		type:String,
		require:true,
		index:{
			unique:true
		}},
	date:{
		type:Date,
		default:Date.now
	}	

});
    

  var userModel=new mongoose.model('users',userSchema);
  module.exports=userModel;